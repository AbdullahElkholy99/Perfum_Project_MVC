$(document).ready(function () {

    // المرحلة 1: نزول من فوق
    $("#loginBox").animate({
        margin: "120px",
        opacity: 1
    }, 800, function () {

        // المرحلة 2: فتح البوكس
        $("#loginBox").animate({
            width: "680px",
            height: "680px",
            padding: "60px"
        }, 600, function () {

            // المرحلة 3: اظهار العناصر تدريجياً
            $("#loginBox .hidden").each(function (index) {
                $(this).delay(200 * index).fadeIn(400);
            });

        });

    });

});