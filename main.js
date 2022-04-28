const userBlocking = document.getElementById("user-blocking");
const userVisible = document.getElementById("user-visible");
const background = document.getElementById("background");
const idle = document.getElementById("idle");

function updateLocation(div, event) {
    return () => {
        console.log(div.id);
        div.style.left = event.screenX + "px";
        div.style.top = event.screenY + "px";
    }
}

document.addEventListener("pointermove", (e) => {
    scheduler.postTask(updateLocation(userBlocking, e), {priority:"user-blocking"});
    scheduler.postTask(updateLocation(userVisible, e), {priority:"user-visible"});
    scheduler.postTask(updateLocation(background, e), {priority:"background"});
    requestIdleCallback(updateLocation(idle, e), {timeout:100});
})

function postSpammyTask() {
    scheduler.postTask(() => {
        const start = performance.now();
        while (performance.now() < start + 50);
        postSpammyTask();
    }, {delay:10})
}

postSpammyTask();