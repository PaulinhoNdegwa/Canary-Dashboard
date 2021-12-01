const greeting = () => {
    let greeting;
    const hourOfDay = new Date().getHours()
    if (hourOfDay < 12) {
        greeting = 'Good morning'
    } else if (hourOfDay < 17) {
        greeting = 'Good afternoon'
    } else {
        greeting = 'Good evening'
    }
    console.log(greeting)
    return greeting;
}

export { greeting }