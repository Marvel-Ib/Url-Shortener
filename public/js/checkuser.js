$("#usercheck").on("input", function () {
  $.get("/check?username=" + $("#usercheck").val().toLowerCase(), function (
    response
  ) {
    $("#usernameResponseHidden").text(response.message);

    if ($("#usernameResponseHidden").html() === "user doesn't exist") {
      $("#usernameResponse").text("   ");
    }

    if ($("#usernameResponseHidden").html() === "user exists") {
      $("#usernameResponse").text(
        "That username is taken. Please pick another"
      );
    }
  });
});
