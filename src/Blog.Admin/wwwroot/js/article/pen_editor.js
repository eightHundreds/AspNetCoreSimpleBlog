﻿
$(function () {
    var SaveArticle = function () {
        var postData = $("#modal_edit_more").serializeFormToObject();
        postData.Tags = [];
        postData.Content = window.pen.toMd();
        var tags = $('.taglist .label').text().match(/[^ ]+/g);
        $.each(tags || [], function (i, e) {
            postData.Tags.push({
                Name: e
            });
        })
        window.editorUploader.Upload(postData, function (isSuccess,data,res) {
            if (isSuccess && res.status<300) {
                toastr.success('', '保存成功', { positionClass: "toast-bottom-right" })
            } else {

            }
        })
        console.log(postData);
    }
    var EditorInit = function () {
        var options = {
            toolbar: document.getElementById('custom-toolbar'),
            editor: document.querySelector('[data-toggle="pen"]'),
            debug: true,
            list: [
                'insertimage', 'blockquote', 'h2', 'h3', 'p', 'code', 'insertorderedlist', 'insertunorderedlist', 'inserthorizontalrule',
                'indent', 'outdent', 'bold', 'italic', 'underline', 'createlink'
            ]
        };
        var pen = window.pen = new Pen(options);
        pen.focus();

        var toolbar = $("#custom-toolbar")[0];
        toolbar.style.left = 'auto'
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                toolbar.style.position = 'fixed';
            } else {
                toolbar.style.position = 'static';
            }
        })
    }
    var EditModelInit = function () {
        function getTags() {
            var tags = $('.taglist .label').text().match(/[^ ]+/g)
            return tags || [];
        }
        //输入框添加标签
        $("#modal_edit_more").on('keydown', '#tag_input', function (e) {
            if (e.keyCode == 13) {//回车
                var inputVal = $(this).val();
                if (inputVal.length != 0) {
                    var taglist = $('.taglist');
                    if (inputVal.length != 0 && getTags().indexOf(inputVal) == -1) {
                        taglist.append($('<span class="label label-primary">' + inputVal + ' <i class="fa fa-times-circle"></i></span>'));
                    }
                    $(this).val('');
                }
            }
        })
        //delete tag click
        $("#modal_edit_more").on('click', 'i.fa-times-circle', function () {
            $(this).parent().remove();
        })
        $("#modal_edit_more").on('click', '.btn_save', function () {
            SaveArticle();
            $("#modal_edit_more").modal('hide');
        })
        $("#modal_edit_refresh").click(function (e) {
            $("#modal_edit_post_img").attr('src', $('#modal_edit_post_img_src').val());
        })

        //tagEditEvent();
    }

    EditorInit();
    EditModelInit();


    $(document).keydown(function (e) {
        if (e.ctrlKey & e.keyCode == 83) {

            SaveArticle();
            e.preventDefault();
        }
    })
})
$(function () {
    //tagbar in the bottom events [obsoleted]

    function getTags() {
        var tags = $('#tags .label').text().match(/[^ ]+/g)
        return tags || [];
    }
    var tagBar = $(".tag_bar");
    $("#tagInput").on('keydown', function (e) {
        var keyCode = e.keyCode || e.which || e.charCode;
        if (keyCode == 13) {//回车
            var val = $(this).val().trim();
            $(this).val('');
            if (val.length != 0 && getTags().indexOf(val) == -1) {
                $('#tags').append($('<span class="label label-primary">' + val + ' <i class="fa fa-times-circle"></i></span>'))
            }
        }
    })
    tagBar.on('click', '.label .fa-times-circle', function () {
        $(this).parent().remove();
    })

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            tagBar.hide();
        } else {
            tagBar.show();
        }
    })
})
