module.exports = {
    module: {
        name: 'pipErrors',
        styles: 'index',
        export: 'pip.errors',
        standalone: 'pip.errors'
    },
    build: {
        js: false,
        ts: false,
        tsd: true,
        bundle: true,
        html: true,
        sass: true,
        lib: true,
        images: true,
        dist: false
    },
    file: {
        lib: [
            '../pip-webui-lib/dist/**/*',            
            '../pip-webui-services/dist/**/*',
            '../pip-webui-themes/dist/**/*'
        ]
    },
    samples: {
        port: 8130
    },
    api: {
        port: 8131
    }
};
