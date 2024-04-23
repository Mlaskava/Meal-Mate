import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class NavigationService {

    constructor(private readonly router: Router) {
    }

    showDetailsPage(id: number) {
        this.router.navigate(['details', {id: id}]).catch();
    }

    goToSearchPage() {
        this.router.navigate(['search']).catch();
    }
}