import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

// declare var Auth0Lock: any;
let Auth0Lock = require('auth0-lock').default;

@Injectable()
export class Auth {
    lock = new Auth0Lock('Llii9mkbRwMP81U58sHR6a1Jjblh6h7v', 'litos.eu.auth0.com', {
        closable: false,
        language: 'sv',
        allowSignUp: false,
        theme: {
            logo: "./pizza.ico",
            primaryColor: "#526e83"
        },
        languageDictionary: {
            title: "Pizzera Skaftö"
        }
    });

    constructor(private router: Router) {
        // Add callback for lock `authenticated` event
        this.lock.on("authenticated", (authResult: any) => {
            this.lock.getProfile(authResult.idToken, function (error: any, profile: any) {
                if (error) {
                    throw new Error(error);
                }
                //Set Profile
                localStorage.setItem('profile', JSON.stringify(profile));
                //Set Token
                localStorage.setItem('id_token', authResult.idToken);

                // var redirectUrl = localStorage.getItem("redirectUrl");
                // if (redirectUrl) {
                //     this.router.navigateByUrl(redirectUrl);
                // }
            })
            // this.router.navigate(['/pizzas']);
        });
    }

    public login() {
        // Call the show method to display the widget.
        this.lock.show();
    }

    public logout() {
        // Remove info from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
    }

    // public authenticated() {
    //     if (!tokenNotExpired()) {
    //         this.logout();
    //     }
    //     return tokenNotExpired();
    // };

    public authenticated() {
        // Check if there's an unexpired JWT
        // This searches for an item in localStorage with key == 'id_token'
        return tokenNotExpired();
    }
}

