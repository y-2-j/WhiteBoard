$(()=>{
    const loginContainer = $("#loginContainer");
    const whiteBoardConatiner = $("#whiteBoardContainer");
    const createBtn = $("#create");
    const boardId = $("#boardId");
    const joinBtn = $("#join");
    const userName = localStorage.getItem('username');
    if(userName){
        loginContainer.hide();
        whiteBoardConatiner.show();
    }
    else{
        whiteBoardConatiner.hide();
        whiteBoardConatiner.show();
    }
    createBtn.click(()=>{

    });
    joinBtn.click(()=>{

    });
});