class PageDict {
  template = `index`;
  default = {
    TITLE: '',
    STATIC_DIR: '',
    APP_NAME: '',
    COPYRIGHT: '',
    body_classes:'',
    STYLESHEETS:[],
    HEADER_SCRIPTS:[],
    FOOTER_SCRIPTS:[],
  }

  constructor(dict = {}, ...dictsArrayN){
    this.dict = { ...this.default, ...dict }

    dictsArrayN.forEach((_dict) => {
      this.dict = {...this.dict, ..._dict};
    });

    const year = new Date().getFullYear();
    this.dict.TITLE = process.env.DEFAULT_TITLE,
    this.dict.STATIC_DIR = process.env.STATIC_DIR,
    this.dict.APP_NAME = process.env.APP_NAME,
    this.dict.YEAR = year,

    this.COPYRIGHT = this.replaceString('{{YEAR}}',year,process.env.COPYRIGHT_TXT);
  }
  replaceString(oldString, newString, fullString) {
    return fullString.split(oldString).join(newString);
  }

  addToArrayLib(items,target,property,){
    if(this.dict[target] === undefined) this.dict[target] = [];
    if (Array.isArray(items)) {
      for (const index in items) {
        if( !items[index].hasOwnProperty(property)){
          items[index].splice(index, 1);
        }
      }
      this.dict[target] = this.dict[target].concat(items)
    }else if( items.hasOwnProperty(property) ){
      this.dict[target].push(items)
    }
    this.dict[target] = [...new Set( this.dict[target] )];
  }
  setStylesheets(items){
    this.addToArrayLib(items,'STYLESHEETS','href')
  }
  setHeaderScript(items){
    this.addToArrayLib(items,'HEADER_SCRIPTS','src')
  }
  setFooterScript(items){
    this.addToArrayLib(items,'FOOTER_SCRIPTS','src')
  }
  setKeyValue(key,value){
    if (key === 'STYLESHEETS' || key === 'HEADER_SCRIPTS' || key === 'FOOTER_SCRIPTS') return false;
     this.dict[key] = value;
  }
  extendDict(obj){
    if (typeof obj !== 'object' || obj === null) return;
    if( obj.hasOwnProperty('STYLESHEETS') ){
      this.setStylesheets(obj.STYLESHEETS)
      delete obj.STYLESHEETS;
    }
    if( obj.hasOwnProperty('HEADER_SCRIPTS') ){
      this.setHeaderScript(obj.HEADER_SCRIPTS)
      delete obj.HEADER_SCRIPTS;
    }
    if( obj.hasOwnProperty('FOOTER_SCRIPTS') ){
      this.setFooterScript(obj.FOOTER_SCRIPTS)
      delete obj.FOOTER_SCRIPTS;
    }
    this.dict = { ...this.dict, ...obj }
  }
  setPageLibs(pageType, local_nonce){
    let style_libs = [];
    let header_libs = [];
    let footer_libs = [];

    switch (pageType) {
      case 'index':
        header_libs = [
          { src:`${process.env.STATIC_DIR}/main.bundle.js`, _defer:true, _nonce:false },
          { src:`https://www.google.com/recaptcha/api.js?trustedtypes=true&render=${process.env.RECAPTCHA_FRONTEND_KEY}`, _defer:false, _nonce:true, nonce:local_nonce},
        ];
        break;
      case 'youtube':
        header_libs = [
          { src:`https://www.youtube.com/iframe_api`, _defer:true, _nonce:true, nonce:local_nonce },
          { src:`${process.env.STATIC_DIR}/layout.bundle.js`, _defer:false, _nonce:false, },
        ];
        footer_libs = [
          { src:`${process.env.STATIC_DIR}/yt.bundle.js`, _defer:false, _nonce:false, }
        ]
        break;

      default:
        footer_libs = [
          { src:`${process.env.STATIC_DIR}/layout.bundle.js`, _defer:false , _nonce:false, },
        ];

        break;
    }
    this.setStylesheets(style_libs);
    this.setHeaderScript(header_libs);
    this.setFooterScript(footer_libs);
  }
  getTemplate(pageType){
    let template;
    switch (pageType) {
      case 'index':
        template = 'index';
        break;
      case 'youtube':
        template = `portfolio_${data.type}`;
        break;
      default:
        template = `portfolio_page`;
        break;
    }
    return template;
  }
  getDict(){
    return this.dict;
  }

}


function pageDict(dict = {}, ...dictsArrayN) {
  return new PageDict(dict, ...dictsArrayN);
}

module.exports = {
  pageDict
};