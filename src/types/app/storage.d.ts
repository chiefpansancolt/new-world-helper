export interface Company {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  members: Member[];
}

export interface Member {
  name: string;
  role: "Settler" | "Officer" | "Council" | "Governor";
  houseCount: number;
  trophies: Trophy[];
  gearsets: Gearset[];
}

export interface Trophy {
  type: "Angry Earth" | "Ancient" | "Lost" | "Human" | "Beast" | "Corrupted";
  level: "Minor" | "Basic" | "Major";
}

export interface Gearset {
  type: "Healer" | "Tank" | "Melee" | "Mage" | "Artillery" | "Ranged";
  weapon1:
    | "Sword & Shield"
    | "Rapier"
    | "Hatchet"
    | "Great Axe"
    | "War Hammer"
    | "Bow"
    | "Musket"
    | "Fire Staff"
    | "Life Staff"
    | "Spear"
    | "Greatsword"
    | "Ice Gauntlet"
    | "Void Gauntlet"
    | "Blunderbuss";
  weapon2:
    | "Sword & Shield"
    | "Rapier"
    | "Hatchet"
    | "Great Axe"
    | "War Hammer"
    | "Bow"
    | "Musket"
    | "Fire Staff"
    | "Life Staff"
    | "Spear"
    | "Greatsword"
    | "Ice Gauntlet"
    | "Void Gauntlet"
    | "Blunderbuss";
  weaponArtifact: string;
  armorArtifact: string;
  trinketArtifact: string;
  gearscore: number;
  attributes: Attributes;
}

export interface Attributes {
  strength: number;
  dexterity: number;
  intelligence: number;
  focus: number;
  constitution: number;
}

export interface ImportData {
  companies: Company[];
  version: string;
  exportDate: string;
}
