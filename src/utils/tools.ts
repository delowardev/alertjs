import { Options } from "../types.ts";

function isObject( obj: any )  {
  return obj != null && obj.constructor.name === "Object"
}

/**
 * Validate user defined options
 *
 * @param options
 * @param defaultOptions
 * @param path
 */
function validateUserProps( options: Options, defaultOptions: Options, path?: string ): Options {
  const _options: Options = {} as Options;
  
  for ( let opt in options ) {
    
    const key = opt as keyof Options;
    const _input = options[key];
    const _default = defaultOptions[key];
    
    if( _input === _default ) continue;
    
    // check if option is allowed
    if ( typeof _default === "undefined") {
      const _path = path ? `${path}.${key}` : key;
      console.warn( `Argument '${_path}' is not a valid argument.` );
      continue;
    }
    
    // check if invalid option type has passed
    if ( ( typeof _input !== typeof _default ) || ( isObject( _input ) !== isObject(_default) ) ) {
      console.warn( `Invalid argument passed, argument '${key}' must be typeof '${typeof _default}'.` );
      continue;
    }
    
    if ( isObject( _input ) && isObject(_default)  ) {
      
      const _path = path ? `${path}.${key}` : key;
      // @ts-ignore
      _options[key] = validateUserProps( _input, _default, _path );
    }
    
    // @ts-ignore
    _options[ key ] = typeof options[key] !== 'undefined' ? _input : _default;
    
  }
  
  return Object.assign({}, defaultOptions, _options);
}

function noop(): any {
  return {}
}

export { validateUserProps, noop, isObject }
