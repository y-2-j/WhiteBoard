$(()=>{
    const whiteBoardContainer = $("#whiteBoardContainer");
    const createBtn = $("#create");
    const boardId = $("#boardID");
    const joinForm = $("#joinBoard");

    joinForm.submit(async event =>{
        event.preventDefault();
        const room = boardId.val();
        console.log("Room " + room);
        await localStorage.setItem('room', room);
        const username = await window.prompt("Enter your username!");
        console.log("Username "+ username);
        await localStorage.setItem('username', username);
        window.location = "/whiteboard.html";

    });
    createBtn.click(async()=>{
        const username = await window.prompt("Enter your username!");
        console.log("Username "+ username);
        await localStorage.setItem('username', username);
        await $.get("createRoom", {username}, (room)=>{
            console.log("Room " +room);
            localStorage.setItem('room', room);
        });
        window.location = "/whiteboard.html";
    });
});