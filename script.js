`use strict`;

function getUserInfo(username) {
    let errMsg = "Something went wrong";
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                errMsg = response.statusText;
                Promise.reject();
            }
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => alert(errMsg));
}

function displayResults(responseJson) {
    responseJson.forEach(element => {
        $(".repo-list").append(`
            <li>Repo: <a href="${element.html_url}">${element.name}</a></li>`);
    });
}

function submitWatcher() {
    $(".user-name-form").submit(event => {
        event.preventDefault();
        $(".repo-list").html("");
        const username = $("#user-name-field").val();
        getUserInfo(username);
        $("#user-name-field").val("");
    });
}

$(submitWatcher());