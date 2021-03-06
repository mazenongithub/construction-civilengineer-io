export async function LoadSpecifications(projectid) {

    let APIURL = `${process.env.REACT_APP_SERVER_API}/construction/${projectid}/specifications`

    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    throw data.message
                })
            }
            else {
                let err =  'No network connection or the Server is not responding';
                throw err;
            }
        }

        return resp.json();
    })
}

export async function LoadAllUsers() {

    let APIURL = `${process.env.REACT_APP_SERVER_API}/construction/loadallusers`

    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    throw data.message
                })
            }
            else {
                let err = 'Request failed or Server is not responding' ;
                throw err;
            }
        }

        return resp.json();
    })
}
export async function LoadCSIs() {

    let APIURL = `${process.env.REACT_APP_SERVER_API}/construction/loadcsi`

    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    throw data.message
                })
            }
            else {
                let err = 'Request failed or Server is not responding' ;
                throw err;
            }
        }

        return resp.json();
    })
}
export async function UploadProfileImage(providerid, formdata) {

    var APIURL = `${process.env.REACT_APP_SERVER_API}/construction/${providerid}/uploadprofilephoto`

    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        body: formdata
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = 'Request failed or Server is not responding' ;
                    throw err;
                }
            }

            return resp.json();
        })
}
export async function StripeConnect(stripe) {
    let APIURL = `${process.env.REACT_APP_SERVER_API}/construction/${stripe}/dashboard`
    console.log(APIURL)
    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    throw data.message;
                })
            }
            else {
                let err = 'Request failed or Server is not responding' ;
                throw err;
            }
        }

        return resp.json();
    })
}

export async function CheckUserNode() {

    let APIURL = `${process.env.REACT_APP_SERVER_API}/construction/checkuser`

    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {

                    throw data.message;
                })
            }
            else {
                let err = 'Request failed or Server is not responding' ;
                throw err;
            }
        }

        return resp.json();
    })
}

export async function LogoutUserNode(providerid) {

    let APIURL = `${process.env.REACT_APP_SERVER_API}/construction/${providerid}/logout`
    console.log(APIURL)

    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    
                    throw data.message
                })
            }
            else {
                let err = 'Request failed or Server is not responding' ;
                throw err;
            }
        }

        return resp.json();
    })
}


export async function RegisterNewCompany(values) {
    let providerid = values.providerid;
    let APIURL = `${process.env.REACT_APP_SERVER_API}/construction/${providerid}/createcompany`;
    console.log(APIURL)
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = 'Request failed or Server is not responding' ;
                    throw err;
                }
            }

            return resp.json();
        })

}

export async function AddExistingCompany(values) {
    const providerid = values.providerid;
    let APIURL = `${process.env.REACT_APP_SERVER_API}/construction/${providerid}/addexistingcompany`;
    console.log(APIURL)
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        throw data.message;
                    })
                }
                else {
                    let err = 'Request failed or Server is not responding' ;
                    throw err;
                }
            }

            return resp.json();
        })

}


export async function CheckEmailAddress(emailaddress) {


    var APIURL = `${process.env.REACT_APP_SERVER_API}/construction/${emailaddress}/checkemail`

    return fetch(APIURL, {
        credentials: 'include'

    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }
                else {
                    let err = 'Request failed or Server is not responding' ;
                    throw err;
                }
            }

            return resp.json();
        })
}

export async function AppleLogin(values) {
   
    var APIURL = `${process.env.REACT_APP_SERVER_API}/construction/applelogin`
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }
                else {
                    let err = 'Request failed or Server is not responding' ;
                    throw err;
                }
            }

            return resp.json();
        })
}

export async function ValidateCompanyID(companyurl) {

    var APIURL = `${process.env.REACT_APP_SERVER_API}/construction/${companyurl}/checkcompanyurl`

    return fetch(APIURL, {
        credentials: 'include'

    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }
                else {
                    let err = 'Request failed or Server is not responding' ;
                    throw err;
                }
            }

            return resp.json();
        })
}
export async function CheckProviderID(profile) {

    var APIURL = `${process.env.REACT_APP_SERVER_API}/construction/${profile}/checkprofile`

    return fetch(APIURL, { credentials: 'include' })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }
                else {
                    let err = 'Request failed or Server is not responding' ;
                    throw err;
                }
            }
            return resp.json();

        })
}
export async function RegisterUser(values) {

    let APIURL = `https://civilengineer.io/construction/api/register.php`;
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }
                else {
                    let err = 'Request failed or Server is not responding' ;
                    throw err;
                }
            }

            return resp.json();
        })

}


export async function SaveCompany(myuser) {
    const providerid = myuser.providerid;
    let APIURL = `${process.env.REACT_APP_SERVER_API}/construction/${providerid}/savecompany
    `;
    console.log(APIURL);
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(myuser)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }
                else {
                    let err = 'Request failed or Server is not responding' ;
                    throw err;
                }
            }

            return resp.json();
        })

}

export async function SaveProject(values) {
    const projectid = values.projectid;
    let APIURL = `${process.env.REACT_APP_SERVER_API}/construction/${projectid}/saveproject`;
    console.log(APIURL)
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }
                else {
                    let err = 'Request failed or Server is not responding' ;
                    throw err;
                }
            }

            return resp.json();
        })

}

export async function SaveProfile(values) {
let providerid = values.myuser.providerid;

    let APIURL = `${process.env.REACT_APP_SERVER_API}/construction/${providerid}/saveprofile`;
    console.log(APIURL);
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }
                else {
                    let err = 'Request failed or Server is not responding' ;
                    throw err;
                }
            }

            return resp.json();
        })

}