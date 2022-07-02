import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./@core/helpers/auth-guard";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./@shared/components/login/login.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { RegisterComponent } from "./@shared/components/register/register.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { RankingsComponent } from "./components/rankings/rankings.component";
import { GameComponent } from "./components/game/game.component";
import { PlayComponent } from "./components/play/play.component";
import { FooterComponent } from '../app/components/footer/footer.component';
import { GameItemComponent } from './components/game-item/game-item.component';

const routes: Routes = [
  {
    path: "",
    component: MainPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "welcome", component: WelcomeComponent },
      { path: "footer", component: FooterComponent },
      { path: "game", component: GameComponent},
      { path: "game-item", component: GameItemComponent},
      { path: "play", component: PlayComponent},
      { path: "profile", component: ProfileComponent },
      { path: "rankings", component: RankingsComponent },
      { path: "", redirectTo: "welcome", pathMatch: 'full' },
    ],
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
