import { ActorsStore } from "./ActorsStore";
import { AdminStore } from "./AdminStore";
import { AuthStore } from "./AuthStore";
import { GenresStore } from "./GenresStore";
import { MoviesStore } from "./MoviesStore";
import { UserStore } from "./UserStore";

export interface IStore {
  auth: AuthStore
  user: UserStore
  movies: MoviesStore
  genres: GenresStore
  actors: ActorsStore
  admin: AdminStore
}