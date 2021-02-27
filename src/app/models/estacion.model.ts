import { Location } from './location.model';
import { Snapshot } from './snapshot.model';

export class Estacion {
    public asset: number;
    public id: number;
    public type: string;
    public location: Location;
    public name : string;
    public snapshot:  Array<Snapshot>;;
}

