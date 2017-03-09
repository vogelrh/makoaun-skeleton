var appRoot = 'src/';
var client = 'client/';
var server = 'server/';
var clientRoot = appRoot + client;
var serverRoot = appRoot + server;
var outputRoot = 'dist/';
var exporSrvtRoot = 'export/'

module.exports = {
  client: {
    root: clientRoot,
    source: clientRoot + '**/*.ts',
    html: clientRoot + '**/*.html',
    css: clientRoot + '**/*.css',
    images: clientRoot + '**/*.{png,gif,jpg}',
    style: 'styles/**/*.css',
    output: outputRoot + client,
    exportSrv: exporSrvtRoot,
    doc: './doc',
    e2eSpecsSrc: 'test/e2e/src/**/*.ts',
    e2eSpecsDist: 'test/e2e/dist/'
  },
  server: {
    root: serverRoot,
    source: serverRoot + '**/*.ts',
    output: outputRoot + server,
    exportSrv: exporSrvtRoot,
    doc: './doc'
  },
    dtsSrc: [
      './typings/**/*.d.ts',
      './custom_typings/**/*.d.ts'
    ]
}
