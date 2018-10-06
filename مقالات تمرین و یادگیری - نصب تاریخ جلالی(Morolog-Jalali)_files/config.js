function config_codesnippet(textarea_id) {
    
    CKEDITOR.disableAutoInline = true;

    var config = {
        toolbar: [
            ['Save', 'NewPage', 'Preview', 'Print', '-', 'Templates'],
            ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord'],
            ['Undo', 'Redo'],
            ['Find','Replace'],
            ['Maximize'],
            '/',
            ['CodeSnippet'],
            ['Source'],
            ['Bold', 'Italic', 'Strike', 'RemoveFormat'],
            ['NumberedList', 'BulletedList', 'Outdent'],
            ['Indent', 'Blockquote', 'CreateDiv'],
            ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
            ['JustifyBlock','BidiLtr','BidiRtl'],
            ['Image', 'Link', 'Unlink', 'Table', 'HorizontalRule', 'SpecialChar'],
            ['Styles', 'Format','Font','FontSize'],
        ],
        extraPlugins : 'codesnippet',
        codeSnippet_theme: 'monokai_sublime',
        codeSnippet_languages: [
            'PHP',
            'JAVASCRIPT',
            'MYSQL',
            'JQUERY',
            'HTML',
            'CSS',
        ],
        filebrowserBrowseUrl : '/ckeditor/ckfinder/ckfinder.html',
        filebrowserUploadUrl : '/ckeditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
        filebrowserImageBrowseUrl : '/ckeditor/ckfinder/ckfinder.html?type=Images',
        filebrowserFlashBrowseUrl : '/ckeditor/ckfinder/ckfinder.html?type=Flash',
        filebrowserImageUploadUrl : '/ckeditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images',
        filebrowserFlashUploadUrl : '/ckeditor/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash',
//        height: 400,
//        uiColor: '#ffaaaa',
        stylesSet: [
            { 
                name: 'My Custom Block 1', 
                element: 'span', 
                styles: { color:'#c131e0', background:'#f7dbf7', padding:'1px 3px'} 
            },
            { 
                name: 'text-muted class', 
                element: 'span', 
                attributes: { 'class': 'text-muted'} 
            }
        ],
    };

    /**
     * آیدی تکست آرآها رو در یک آرایه قرار میدیم
     * اینطوری کداسنیپت رو به همشون اعمال میکنیم با قرار دادن کدها در حلقه
     * تعداد خانه های آرایه رو هم برای استفاده در حلقه ها بدست میاریم
     * تا اگه کدمون تغییر کرد فقط عناصر آرایه رو کم یا زیاد کنیم
     */
    var editor = textarea_id;
    var editor_len = editor.length;

    for (i = 0; i < editor_len; i++) {
        CKEDITOR.replace(editor[i], config);
    }


    CKEDITOR.inline('editable', CKEDITOR.tools.extend({}, config, {
        extraPlugins: 'codesnippet'
    }, true));

    for (i = 0; i < editor_len; i++) {
        initThemeChange(editor[i]);
    }

    function initThemeChange(editor) {
        var templates = [
            'monokai_sublime', 'default', 'arta',
            'ascetic', 'atelier-dune.dark',
            'atelier-dune.light', 'atelier-forest.dark',
            'atelier-forest.light', 'atelier-heath.dark',
            'atelier-heath.light', 'atelier-lakeside.dark',
            'atelier-lakeside.light', 'atelier-seaside.dark',
            'atelier-seaside.light', 'brown_paper',
            'dark', 'docco', 'far', 'foundation',
            'github', 'googlecode', 'idea', 'ir_black',
            'magula', 'mono-blue', 'monokai', 'obsidian',
            'paraiso.dark', 'paraiso.light', 'pojoaque',
            'railscasts', 'rainbow', 'school_book',
            'solarized_dark', 'solarized_light',
            'sunburst', 'tomorrow-night-blue',
            'tomorrow-night-bright', 'tomorrow-night-eighties',
            'tomorrow-night', 'tomorrow', 'vs',
            'xcode', 'zenburn'
        ],
                pre = CKEDITOR.document.getById('sampleConfig'),
                select = CKEDITOR.document.getById('select'),
                codeTemplate = 'CKEDITOR.replace( \'' + editor + '\', {\n' +
                '	<strong>extraPlugins: \'codesnippet\',</strong>\n' +
                '	codeSnippet_theme: \'{tpl}\'\n' +
                '} );',
                name, option;

        while ((name = templates.shift())) {
            option = CKEDITOR.document.createElement('option', {
                attributes: {
                    value: name
                }
            });

            option.setText(name);
            select.append(option);
        }

        select.$.onchange = function () {
            if (CKEDITOR.instances.editor1)
                CKEDITOR.instances.editor1.destroy();

        for (i = 0; i < editor_len; i++) {
            CKEDITOR.replace(editor[i], CKEDITOR.tools.extend({}, config, {
                codeSnippet_theme: this.value
            }, true));
        }

            pre.setHtml(codeTemplate.replace('{tpl}', this.value));
        };
    }

    if (CKEDITOR.env.ie && CKEDITOR.env.version == 8)
        CKEDITOR.document.getById('ie8-warning').addClass('warning');
}

$(document).ready(function () {

    // متغیری برای نگهداشتن آیدیهای تکست آرآ
    var textarea_ids = [];
    // متغیری برای نگهداشتن تعداد تکست آرآها
    var len = ($('textarea').length);

    $('textarea').each(function () {
        // آرایه ایدیها را از صفر شروع میکند
        len--;
        textarea_ids[len] = $(this).attr('id');
    });

    config_codesnippet(textarea_ids);

});