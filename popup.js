$(function () {

    chrome.runtime.sendMessage({ type: 'getbookmarks' }, function (response) {
       
        if (response) {
            res = JSON.parse(response)
            if (res.images) {
                res.images.forEach(element => {
                    html = `<div class="col-6">
                    <div class="card card-blog">
                    <div class="card-image">
                    <img class="img rounded" src="${element}">
                    </div>                           
                    </div>`;
                    $('#image-section').append(html)
                });
            }
            if (res.links) {
                res.links.forEach(element => {                    
                    $('#linkwebsite').append('<a class="" href="element">' + element + '</a>')                    
                });
            }
            if (res.texts) {
                res.texts.forEach(element => {
                    $('#linktext').append('<span class="badge badge-info">' + element + '</span>')
                })
            }

        }

    })
    function copyToClipboard(element) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(element).text()).select();
        document.execCommand("copy");
        $temp.remove();
    }

    function CopyToClipBoard() {
        /* Get the text field */
        var copyText = document.getElementById("myInput");

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /*For mobile devices*/

        /* Copy the text inside the text field */
        document.execCommand("copy");

        /* Alert the copied text */
        alert("Copied the text: " + copyText.value);
    }

});