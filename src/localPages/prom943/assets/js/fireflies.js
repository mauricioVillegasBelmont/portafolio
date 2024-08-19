Pymeweb.prototype.init_fireflies = function(args){
  if (typeof args !== 'object' || !args.id || !args.json){
    console.warn('partilces misconfig');
    return;
  }
  particlesJS.load(args.id, args.json, function() {console.log('callback - fireflies config loaded');});
}
