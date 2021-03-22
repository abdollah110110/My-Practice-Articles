// recaptcha codes
// var onloadCallback = function() {
//     grecaptcha.execute();    
// };
// function setResponse(response) { 
//     document.getElementById('captcha-response').value = response;     
// }

function copyToClipboard(text) {
    let $temp = $("<input>");
    $("body").append($temp);
    $temp.val(text).select();
    document.execCommand("copy");
    $temp.remove();
}

// convert numbers to persian : just add class fa to parent element
var numMap = { 0: '۰', 1: '۱', 2: '۲', 3: '۳', 4: '۴', 5: '۵', 6: '۶', 7: '۷', 8: '۸', 9: '۹' };

function toEnglishNumber(num) {
    var find = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    var replace = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var replaceString = num;
    var regex;
    for (var i = 0; i < find.length; i++) {
        regex = new RegExp(find[i], "g");
        replaceString = replaceString.replace(regex, replace[i]);
    }
    return replaceString;
}

function toPersianNumber(el) {
    if (el.nodeType == 3) {
        var list = el.data.match(/[0-9]/g);
        if (list != null && list.length != 0)
            for (var i = 0; i < list.length; i++)
                el.data = el.data.replace(list[i], numMap[list[i]]);
    }
    for (var j = 0; j < el.childNodes.length; j++)
        toPersianNumber(el.childNodes[j]);
}

$(".faNum").each(function() {
    toPersianNumber($(this).get(0));
});

jQuery(document).ready(function($) {
    jQuery('.clickCopy').click(function() {
        let text = jQuery(this).attr('data-copy');
        copyToClipboard(text);
        alert("متن زیر در کلیپ بورد کپی شد :\n" + text);
    });
    $('#attachment').on('change', function(event) {
        const file = event.target.files[0];
        if (((file.size / 1024).toFixed(1)) > 2048) {
            event.target.value = null;
            alert('حجم مجاز فایل پیوستی حداکثر ۲مگابایت می‌باشد.');
            $('#attachment_name').text("");
        } else {
            $('#attachment_name').text(file.name);
        }
    });
    // Toggle Ajax
    $(document).on("click", '[data-ajax]', function(event) {
        event.preventDefault();
        var ajaxTag = $(this);
        var data = JSON.parse(ajaxTag.attr('data-data'));
        var action = ajaxTag.attr('data-ajax');
        var ajxatParentTag = $(ajaxTag).parent()
        data['action'] = action;
        var ajaxResult = $(ajxatParentTag).find('div.ajr');
        var loader = $("<div class='loader'></div>").show();
        var domainName = window.location.hostname;
        var protocolName = window.location.protocol
        var url = protocolName + "//" + domainName + "/ajaxman/handle";
        var oldValue = ajaxResult.html();
        ajaxResult.html(loader)
        $.ajax({
            data: data,
            method: 'post',
            url: url,
            success: function(response) {
                loader.toggle();
                ajaxResult.html(oldValue);
                if (response.data.hasOwnProperty('type')) {
                    handleToggleAjax(ajaxTag, response, ajaxResult);
                }
            },
            error: function(response) {

            }
        });
    });
    //Form Ajax
    $(document).on("submit", 'form.ajf', function(event) {
        event.preventDefault();
        var Form = $(this);
        let formData = new FormData(Form[0]);
        console.log($('#attachment').val());
        var msgTag = Form.find("div.ajr");
        var loaderTag = Form.find("div.loader");
        msgTag.html('');
        loaderTag.toggle();
        $.ajax({
            data: formData,
            method: Form.attr("method"),
            url: Form.attr("action"),
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            cache: false,
            success: function(response) {
                if (response.data.type == 'auth') {
                    grecaptcha.reset(); // update captcha after each try!
                }

                loaderTag.toggle();
                if (response.status_code == 422) {
                    if (typeof response.data !== 'undefined') {
                        if (response.data.hasOwnProperty('tag_names')) {
                            handleFormErrorTags(Form, response.data.tag_names);
                        }
                    }
                }
                if (response.status_code == 200 || response.status_code == 201 || response.data.type == 'bookmark') {
                    msgTag.html(response.message);
                    if (response.data.hasOwnProperty('type')) {
                        handleFormAjax(Form, response);
                    }
                }
                msgTag.html(response.message);
            },
            error: function(data) {
                simpleSweetalert('error', 'خطا', 'درخواست شما ناموفق بود')
            }
        });
    });

    function handleFormErrorTags(form, tagNames) {
        $.each(tagNames, function(index, tagName) {
            var tagItem = form.find('[name=' + tagName + ']');
            // if(tagItem.length == 0){
            //     tagItem=form.find('#' + tagName);
            // }
            tagItem.css('border-color', '#f15555');
            setTimeout(function() {
                tagItem.css('border-color', '#d8d8d8');
            }, 3000);
        });
    }

    function handleFormAjax(form, response) {
        var responseType = response.data.type;
        switch (responseType) {
            case 'auth':
                handleLogin(form, response);
                break;
            case 'topic':
                handleTopic(form, response.data.redirect_url);
                break;
            case 'forum_comment':
            case 'reply':
                reloadLocation();
                break;
            case 'management_author':
                handleManagementAuthor(form, response.data);
                break;
            case 'archive':
                handleArchivePost(form, response.data);
                handlePagination(response.data.paginate);
                break;
        }
    }

    function handleToggleAjax(tag, response, resultTag) {
        var responseType = response.data.type;
        switch (responseType) {
            case 'bookmark':
                handleBookmark(tag, response);
                break;
            case 'vote':
                handleVote(tag, response, resultTag);
                break;
            case 'more_replies':
                handleTopicReplies(tag, response);
                break;
            case 'verify_reply':
                handleVerifyReply(tag, response);
                break;
            case 'soft_delete':
                handleSoftDelete(tag, response);
                break;
            case 'score':
                handleScore(tag, response);
                break;
            case 'activity_comment':
                handleActivityComment(tag, response);
                break;
            case 'load_more_comment':
                handleLoadMoreComment(tag, response);
                break;
            case 'author':
                handleManagementAuthor(tag, response.data);
                break;
        }
    }

    function handleVote(tag, response, resultTag) {
        if (response.status_code == 200) {
            resultTag.html(response.data.vote_count);
            simpleSweetalert('success', 'رای', response.message);
        } else {
            simpleSweetalert('warning', 'رای', response.message)
        }
    }

    function handleTopic(form, url) {
        var msgTag = form.find("div.ajr");
        var loaderTag = form.find("div.loader");
        msgTag.append('<p>در حال انتقال به تاپیک </p>');
        loaderTag.toggle();
        setTimeout(function() {
            window.location.replace(url);
        }, 3000)
    }

    function reloadLocation() {
        window.location.reload();
    }

    function handleLogin(form, response) {
        form.find("div.ajr").append('<p>' + response.message + '</p>');
        setTimeout(function() {
            window.location.replace(response.data.url);
        }, 1000)
    }

    function handleBookmark(tag, response) {
        var title = 'علاقه مندی'
        if (response.data.bookmark_action == 'authentication') {
            simpleSweetalert('error', title, response.message);
        }
        if (response.data.bookmark_action == 'add') {
            tag.addClass('icon-bookmark');
            tag.removeClass('icon-bookmark-o');
            simpleSweetalert('success', title, response.message);
        }
        if (response.data.bookmark_action == 'remove') {
            tag.addClass('icon-bookmark-o');
            tag.removeClass('icon-bookmark');
            simpleSweetalert('error', title, response.message);
        }
    }

    function handleLoadMoreComment(tag, response) {
        if (response.data.comments.length > 0) {
            let data = JSON.parse(tag.attr('data-data'));
            data['page'] = parseInt(data['page']) + 1;
            $(tag).attr('data-data', JSON.stringify(data))
            tag.parent().before(response.data.comments);
        } else {
            tag.parent().css("display", "none");
        }
    }

    function handleTopicReplies(tag, response) {
        if (response.data.replies.length > 0) {
            let data = JSON.parse(tag.attr('data-data'));
            data['page'] = parseInt(data['page']) + 1;
            $(tag).attr('data-data', JSON.stringify(data))
            tag.parent().before(response.data.replies);
        } else {
            tag.parent().css("display", "none");
        }
    }

    function handleActivityComment(tag, response) {
        let comment_list = $('.comment-list');
        comment_list.html();
        if (response.data.comment.length > 0) {
            comment_list.html(response.data.comment);
            $('.loader').css("display", "none");
        }
        if (response.data.replies.length > 0) {
            let comment = $(comment_list).find('.comment');
            $(comment).append("<div class='child-comment'>" + response.data.replies + "</div>")
        }
        $('.reply').css("display", "none");
    }

    function handleArchivePost(form, data) {
        let archive_post_tag = $('#posts');
        let archive_section_title = $('#section_title');
        if (data.posts.length > 0) {
            archive_post_tag.html(data.posts)
        } else {
            archive_post_tag.html('<p class="col-12">موردی یافت نشد!</p>');
        }
        archive_section_title.html(data.section_title);
    }

    function handlePagination(paginate) {
        let paginate_tag = $("#paginate")
        if (paginate.length > 0) {
            paginate_tag.html(paginate)
        } else {
            paginate_tag.html('')
        }
    }

    function handleManagementAuthor(tag, data) {
        if (!tag.is('form')) {
            tag = $('form#management-author-form');
        }
        if (data.hasOwnProperty('management_url')) {
            setTimeout(function() {
                window.location.replace(data.management_url);
            }, 1000)
        }
        if (data.hasOwnProperty('author_description')) {
            tag.find('[name="author_request_id"]').val(data.author_request_id);
            tag.find('.author-description').html(data.author_description);
            tag.find('[name="author_response"]').val(data.author_response);
        }
        tag.find('#status-' + data.author_status).attr('checked', 'checked');
    }

    function handleVerifyReply(tag, response) {
        if (response.status_code == 200) {
            simpleSweetalert('success', 'تایید پاسخ', response.message)
            tag.removeClass('accept accepted-clickable topic-owner');
            tag.addClass('accepted');
        } else {
            simpleSweetalert('error', 'تایید پاسخ', response.message)
        }
    }

    function handleSoftDelete(tag, response) {
        var actionType = tag.attr('class');
        var data = JSON.parse(tag.attr('data-data'));
        var deletedBadge = $('span.deleted-badge-' + data['type'] + '-' + data['id'])
        if (actionType == 'soft-delete') {
            tag.removeClass(actionType);
            tag.addClass('restore');
            deletedBadge.addClass(' deleted ');
            deletedBadge.text('حذف شده');
            message = 'آیتم با موفقیت حذف شد';
            title = 'حذف';
        }
        if (actionType == 'restore') {
            tag.removeClass(actionType);
            tag.addClass('soft-delete')
            deletedBadge.removeClass('deleted');
            deletedBadge.text('');
            message = 'آیتم با موفقیت بازگردانی شد';
            title = 'بازگردانی';
        }
        simpleSweetalert('success', title, message)
    }

    function handleScore(tag, response) {
        if (response.status_code == 200 || response.status_code == 201) {
            simpleSweetalert('success', 'امتیاز', response.message);
        } else {
            simpleSweetalert('error', 'امتیاز', response.message);
        }
    }

    function simpleSweetalert(icon, title, text) {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
            timer: 2000,
            showConfirmButton: false
        })
    }

    $("select.type,select.category,select.sort").on("change", function(event) {
        $('[name="paginate"]').val(1);
        $('form#archive_filter').trigger('submit');
    });
    $("#paginate").on("click", "a.page-numbers", function(event) {
        event.preventDefault();
        var link = $(this);
        var paginate = $('[name="paginate"]');
        var pagelinkNum = parseInt(toEnglishNumber(link.text()));
        if (Number.isNaN(pagelinkNum)) {
            let currentPage = parseInt(paginate.val());
            if (link.hasClass('next')) {
                pagelinkNum = currentPage + 1;
                // paginate.val(function (i, oldValue) {
                //     return parseInt(oldValue) + 1 ;
                // });
            }
            if (link.hasClass('prev')) {
                pagelinkNum = currentPage - 1;
            }
        }
        if (!Number.isNaN(pagelinkNum)) {
            paginate.val(pagelinkNum);
            $('form#archive_filter').trigger('submit');
        }
    });
    $(".btn-attach-code").on("click", function(event) {
        event.preventDefault();
        $('textarea[name ="commentCode"]').slideToggle("fast");
    });
});