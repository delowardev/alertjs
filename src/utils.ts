function createAlertElement( type = 'div', className?: string, id?: string ) {
  return Object.assign(
      document.createElement( type ),
      {
        id,
        className
      }
  )
}


export { createAlertElement }
