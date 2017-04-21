//Mastodon Timeline Peeping Tool Made by YUKIMOCHI(@YUKIMOCHI@toot.yukimochi.jp)
//This software is released under the MIT License.
//Copyright (c) 2017 YUKIMOCHI Laboratory

var Is_Federate = false;
var latest_head = 0;

$("#Local").click(function () {
    Is_Federate = false;
    $("#Instance").attr("disabled", "disabled");
    $("#Local").attr("disabled", "disabled");
    $("#Federate").attr("disabled", "disabled");
    Fetch_toot();

    window.setTimeout(Restart_Local, 5000);
});

$("#Federate").click(function () {
    Is_Federate = true
    $("#Instance").attr("disabled", "disabled");
    $("#Local").attr("disabled", "disabled");
    $("#Federate").attr("disabled", "disabled");
    Fetch_toot();

    window.setTimeout(Restart_Federate, 5000);
});

$("#Clean").click(function () {
    latest_head = 0;
    $("#Instance").removeAttr("disabled");
    $("#Local").removeAttr("disabled");
    $("#Federate").removeAttr("disabled");
});

function Restart_Local() {
    $("#Local").removeAttr("disabled");
}

function Restart_Federate() {
    $("#Federate").removeAttr("disabled");
}

function Fetch_toot() {
    var UrlBase = "";
    if (Is_Federate) {
        UrlBase = 'https://' + $("#Instance").val() + '/api/v1/timelines/public';
    }
    else {
        UrlBase = 'https://' + $("#Instance").val() + '/api/v1/timelines/public?local="true"';
    }
    $.ajax({
        type: 'GET',
        url: UrlBase,
        dataType: 'json',
        success: function (json) {
            var len = json.length;
            var temp;
            for (var i = 0; i < len; i++) {
                if (json[len - i - 1].id > latest_head) {
                    var date = new Date(Date.parse(json[len - i - 1].created_at));
                    $("#Timeline_head").eq(0).after(
                        "<tr><td><img src=\"" + json[len - i - 1].account.avatar + "\"width=\"32pt\" /> " + json[len - i - 1].account.display_name + "</td>" + "<td><a href=\"" + json[len - i - 1].account.url + "\"/a>" + json[len - i - 1].account.acct + "</td>" + "<td>" + json[len - i - 1].content + "</td>" + "<td>" + date.toLocaleString() + "</td></tr>"
                    )
                }
            }
            latest_head = json[0].id;
        }
    });
}