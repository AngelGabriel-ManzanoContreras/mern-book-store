export const authLinks = {
    signIn : { title: 'Sign in', path: '/auth/sign-in' },
    signUp : { title: 'Sign up', path: '/auth/sign-up' },
    logout : { title: 'Logout', path: '/auth/logout' },
}

export const bookLinks = {
    addBook : { title: 'Add book', path: '/book/add' },
    viewBook : { title: 'View book', path: ( bookId : string ) => `/book/${ bookId }` },
    editBook : { title: 'Edit book', path: ( bookId : string ) => `/book/${ bookId }/edit` },
}