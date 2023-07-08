import { Options } from "../types.ts";

function validateUserProps( options: Options, defaultOptions: Options ): Options {
  const _options: Options = {} as Options;
  
  for ( let key in defaultOptions ) {
    
    const _input = options[key];
    const _default = defaultOptions[key];
    
    // check if option is allowed
    if ( typeof _default === "undefined") {
      console.warn( `Argument '${key}' is not a valid argument.` );
      continue;
    }
    
    // check if invalid option type has passed
    if ( typeof _input !== typeof _default ) {
      console.warn( `Invalid argument passed, argument '${key}' must be typeof '${typeof _default}'.` );
      continue;
    }
    
    _options[ key ] = typeof options[key] !== 'undefined' ? _input : _default;
  }
  
  return _options;
}

function noop(): any {
  return {}
}

export { validateUserProps, noop }
