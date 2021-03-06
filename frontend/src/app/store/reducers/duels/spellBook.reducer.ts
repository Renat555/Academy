import { createReducer } from '@ngrx/store';

export interface SpellbookState {
  [spellName: string]: {
    russianName: string;
    actionPoints: number;
    energyPoints: number;
    duration: number;
    description: string;
    dependenciens: string[];
  };
}

const initialState: SpellbookState = {
  firespear: {
    russianName: 'Метеор',
    actionPoints: 1,
    energyPoints: 1,
    duration: 0,
    description:
      '(огонь, прямой урон) Наносит урон противнику от 20 до 30 единиц.',
    dependenciens: [],
  },
  fireshield: {
    russianName: 'Огненный щит',
    actionPoints: 1,
    energyPoints: 1,
    duration: 4,
    description:
      '(огонь, баф) В течении четырех ходов снижает на 40% урон от дебафов.',
    dependenciens: [],
  },
  firecrown: {
    russianName: 'Огненный венец',
    actionPoints: 1,
    energyPoints: 1,
    duration: 4,
    description:
      '(огонь, баф) В течении четырех ходов усиливает ваши атакующие заклинания на 25%.',
    dependenciens: [],
  },
  firesource: {
    russianName: 'Вулкан',
    actionPoints: 1,
    energyPoints: 1,
    duration: 3,
    description:
      '(огонь, дебаф) В течении трех ходов, каждый ход наносит от 5 до 12 единиц урона.',
    dependenciens: [],
  },
  firesphere: {
    russianName: 'Огненная клетка',
    actionPoints: 1,
    energyPoints: 1,
    duration: -1,
    description:
      '(огонь, дебаф) При получении прямого урона наносит 5-10 единиц урона от клетки, действует постоянно.',
    dependenciens: [],
  },
  firestamp: {
    russianName: 'Клеймо огня',
    actionPoints: 1,
    energyPoints: 1,
    duration: 0,
    description:
      '(огонь, другое) Увеличивает продолжительность всех наложенных на врага дебафов на два хода.',
    dependenciens: [],
  },
  firekey: {
    russianName: 'Ключ огня',
    actionPoints: 1,
    energyPoints: 1,
    duration: 0,
    description:
      '(огонь, диспел) Снимает с противника баф воды или земли. Не забудьте выбрать цель.',
    dependenciens: [
      'watershield',
      'watercrown',
      'watersphere',
      'waterstamp',
      'waterpower',
      'earthshield',
      'earthcrown',
      'earthsource',
      'earthstamp',
      'earthpower',
    ],
  },
  fireflow: {
    russianName: 'Струя пламени',
    actionPoints: 1,
    energyPoints: 1,
    duration: 0,
    description:
      '(огонь, прямой урон) Наносит противнику урон от 25 до 35 единиц, попадает в цель с вероятностью 66%.',
    dependenciens: [],
  },
  firepower: {
    russianName: 'Власть огня',
    actionPoints: 1,
    energyPoints: 1,
    duration: -1,
    description:
      '(огонь, баф) Постоянно увеличивает урон от атакующих огненных заклинаний на 5 единиц.',
    dependenciens: [],
  },
  waterspear: {
    russianName: 'Ледяной осколок',
    actionPoints: 1,
    energyPoints: 1,
    duration: 0,
    description:
      '(вода, прямой урон) Наносит противнику от 5 до 15 единиц урона, за каждый дебаф, наложенный на противника, наносимый урон дополнительно увеличивается на 5.',
    dependenciens: [],
  },
  watershield: {
    russianName: 'Ледяная стена',
    actionPoints: 1,
    energyPoints: 1,
    duration: 6,
    description:
      '(вода, баф) В течении шести ходов снижает урон от атакующих заклинаний на 40%.',
    dependenciens: [],
  },
  watercrown: {
    russianName: 'Корона воды',
    actionPoints: 1,
    energyPoints: 1,
    duration: 6,
    description:
      '(вода, баф) Снижает урон от дебафов на 50%, действует шесть ходов.',
    dependenciens: [],
  },
  watersource: {
    russianName: 'Родник',
    actionPoints: 1,
    energyPoints: 1,
    duration: 0,
    description:
      '(вода, диспел) Позволяет снять дебаф огня, воды, земли или воздуха с вероятностью 66%. Не забудьте выбрать цель.',
    dependenciens: [
      'firesource',
      'firesphere',
      'earthsphere',
      'airshield',
      'aircrown',
      'airsphere',
      'airstamp',
    ],
  },
  watersphere: {
    russianName: 'Ледяная сфера',
    actionPoints: 1,
    energyPoints: 1,
    duration: 3,
    description:
      '(вода, дебаф) Замораживает часть карты, размером 4х4 клетки. Игрок находящейся внутри данной области получит 20 единиц урона в конце хода.',
    dependenciens: [],
  },
  waterstamp: {
    russianName: 'Печать воды',
    actionPoints: 1,
    energyPoints: 1,
    duration: 6,
    description:
      '(вода, баф) В течении шести ходов блокирует треть урона от атакующих заклинаний.',
    dependenciens: [],
  },
  waterkey: {
    russianName: 'Ключ воды',
    actionPoints: 1,
    energyPoints: 1,
    duration: 0,
    description:
      '(вода, диспел) Позволяет снять дебаф огня или воздуха. Не забудьте выбрать цель.',
    dependenciens: [
      'firesource',
      'firesphere',
      'airshield',
      'aircrown',
      'airsphere',
    ],
  },
  waterflow: {
    russianName: 'Водный поток',
    actionPoints: 1,
    energyPoints: 1,
    duration: 0,
    description: '(вода, прямой урон) Наносит 20 единиц урона.',
    dependenciens: [],
  },
  waterpower: {
    russianName: 'Власть воды',
    actionPoints: 1,
    energyPoints: 1,
    duration: -1,
    description:
      '(вода, баф) Постоянно увеличивает срок действия водных бафов на два хода.',
    dependenciens: [],
  },
  earthspear: {
    russianName: 'Глыба',
    actionPoints: 1,
    energyPoints: 1,
    duration: 0,
    description:
      '(земля, прямой урон) Наносит урон противнику от 50 до 70 единиц. Попадает в цель с вероятностью 33%',
    dependenciens: [],
  },
  earthshield: {
    russianName: 'Скала',
    actionPoints: 1,
    energyPoints: 1,
    duration: 5,
    description:
      '(земля, блок) Полностью блокирует заклинания обоих игроков, если находится между ними. Действует пять ходов.',
    dependenciens: [],
  },
  earthcrown: {
    russianName: 'Корона земли',
    actionPoints: 1,
    energyPoints: 1,
    duration: 6,
    description:
      '(земля, баф) На шесть ходов увеличивает вероятность попаданя по противнику атакующими заклинаниями на 15%.',
    dependenciens: [],
  },
  earthsource: {
    russianName: 'Земные недра',
    actionPoints: 1,
    energyPoints: 1,
    duration: 4,
    description:
      '(земля, баф) Увеличивает урон от атакующих земных заклинаний на 15 единиц, увеличивает длительность дебафов земли на один ход, действует четыре хода.',
    dependenciens: [],
  },
  earthsphere: {
    russianName: 'Склеп',
    actionPoints: 1,
    energyPoints: 1,
    duration: 10,
    description:
      '(земля, дебаф) Увеличивает вероятность попадания по противнику дебафами и заклинаниями урона на 5%, на десять ходов.',
    dependenciens: [],
  },
  earthstamp: {
    russianName: 'Печать земли',
    actionPoints: 1,
    energyPoints: 1,
    duration: 4,
    description:
      '(земля, баф) В течении четырех ходов блокирует половину урона от атакующих заклинаний.',
    dependenciens: [],
  },
  earthkey: {
    russianName: 'Ключ земли',
    actionPoints: 1,
    energyPoints: 1,
    duration: 0,
    description:
      '(земля, диспел) Позволяет снять дебаф огня или воздуха. Не забудьте выбрать цель.',
    dependenciens: [
      'firesource',
      'firesphere',
      'airshield',
      'aircrown',
      'airsphere',
      'airstamp',
    ],
  },
  earthflow: {
    russianName: 'Сель',
    actionPoints: 1,
    energyPoints: 1,
    duration: 0,
    description:
      '(земля, прямой урон) Наносит 80 единиц урона, попадает в цель с вероятностью 25%.',
    dependenciens: [],
  },
  earthpower: {
    russianName: 'Власть земли',
    actionPoints: 1,
    energyPoints: 1,
    duration: 4,
    description:
      '(земля, баф) Постоянно увелчивает срок действия бафов земли на четыре хода, срабатывает на каждом бафе с вероятностью 50%, действует четыре хода.',
    dependenciens: [],
  },
  airspear: {
    russianName: 'Копье воздуха',
    actionPoints: 1,
    energyPoints: 1,
    duration: 0,
    description:
      '(воздух, прямой урон) Наносит противнику 25 единиц урона, попадает в цель с вероятностью 75% .',
    dependenciens: [],
  },
  airshield: {
    russianName: 'Вихрь',
    actionPoints: 1,
    energyPoints: 1,
    duration: 4,
    description:
      '(воздух, дебаф) В течении четырех ходов снижает вероятность пападания по противнику заклинаниями урона на 33%.',
    dependenciens: [],
  },
  aircrown: {
    russianName: 'Корона воздуха',
    actionPoints: 1,
    energyPoints: 1,
    duration: 4,
    description:
      '(воздух, дебаф) В течении четырех ходов снижает вероятность успешного наложения бафа на 33%.',
    dependenciens: [],
  },
  airsource: {
    russianName: 'Врата воздуха',
    actionPoints: 1,
    energyPoints: 1,
    duration: 0,
    description:
      '(воздух, баф) В течении шести ходов увеличивает вероятность попадания по противнику дебафами и заклинаниями прямого урона на 10%.',
    dependenciens: [],
  },
  airsphere: {
    russianName: 'Воздушный кокон',
    actionPoints: 1,
    energyPoints: 1,
    duration: 4,
    description:
      '(воздух, дебаф) В течении четырех ходов снижает вероятность попадания дебафом на 33%.',
    dependenciens: [],
  },
  airstamp: {
    russianName: 'Печать воздуха',
    actionPoints: 1,
    energyPoints: 1,
    duration: 10,
    description:
      '(воздух, дебаф) В течении десяти ходов снижает вероятность успешного наложения бафа, на 10%.',
    dependenciens: [],
  },
  airkey: {
    russianName: 'Ключ воздуха',
    actionPoints: 1,
    energyPoints: 1,
    duration: 0,
    description:
      '(воздух, диспел) Позволяет снять с противника баф земли или воды. Не забудьте выбрать цель.',
    dependenciens: [
      'watershield',
      'watercrown',
      'watersphere',
      'waterstamp',
      'waterpower',
      'earthshield',
      'earthcrown',
      'earthsource',
      'earthstamp',
      'earthpower',
    ],
  },
  airflow: {
    russianName: 'Ударная волна',
    actionPoints: 1,
    energyPoints: 1,
    duration: 0,
    description:
      '(воздух, прямой урон) наносит урон противнику 40 единиц. Попадает в цель с вероятностью 50%',
    dependenciens: [],
  },
  airpower: {
    russianName: 'Власть воздуха',
    actionPoints: 1,
    energyPoints: 1,
    duration: -1,
    description:
      '(воздух, баф) Постоянно уменьшает вероятность попадания по вам заклинаниями урона, на 20%.',
    dependenciens: [],
  },
  lifespear: {
    russianName: 'Касание жизни',
    actionPoints: 1,
    energyPoints: 1,
    duration: 0,
    description:
      '(жизнь, диспел) Позволяет снять дебаф смерти. Не забудьте выбрать цель.',
    dependenciens: ['deathshild', 'deathsphere', 'deathstamp', 'deathflow'],
  },
  lifeshield: {
    russianName: 'Щит жизни',
    actionPoints: 1,
    energyPoints: 1,
    duration: -1,
    description:
      '(жизнь, баф) Не позволяет уменьшать максимальный запас здоровья.',
    dependenciens: [],
  },
  lifecrown: {
    russianName: 'Корона жизни',
    actionPoints: 1,
    energyPoints: 1,
    duration: 0,
    description:
      '(жизнь, другое) Увеличивает максимальный запас здоровья на 15 единиц.',
    dependenciens: [],
  },
  lifesource: {
    russianName: 'Источник жизни',
    actionPoints: 1,
    energyPoints: 1,
    duration: 0,
    description: '(жизнь, другое) Восстанавливает тридцать единиц здоровья.',
    dependenciens: [],
  },
  lifesphere: {
    russianName: 'Сфера восстановления',
    actionPoints: 1,
    energyPoints: 1,
    duration: 5,
    description:
      '(жизнь, баф) В течении пяти ходов восстанавливает по 10 единиц здоровья.',
    dependenciens: [],
  },
  lifestamp: {
    russianName: 'Печать жизни',
    actionPoints: 1,
    energyPoints: 1,
    duration: 8,
    description:
      '(жизнь, баф) Не позволяет наклдывать дебафы смерти в течении восьми ходов.',
    dependenciens: [],
  },
  lifekey: {
    russianName: 'Ключ жизни',
    actionPoints: 1,
    energyPoints: 1,
    duration: 0,
    description:
      '(жизнь, диспел) Позволяет снять любой дебаф, срабатывает с вероятностью 66%. Не забудьте выбрать цель.',
    dependenciens: [
      'firesource',
      'firesphere',
      'earthsphere',
      'airshield',
      'aircrown',
      'airsphere',
      'airstamp',
      'deathshield',
      'deathsphere',
      'deathstamp',
      'deathflow',
    ],
  },
  lifeflow: {
    russianName: 'Поток жизни',
    actionPoints: 1,
    energyPoints: 1,
    duration: 2,
    description:
      '(жизнь, баф) Восстанавливает по 25 единиц здоровья за ход, действует два хода.',
    dependenciens: [],
  },
  lifepower: {
    russianName: 'Власть жизни',
    actionPoints: 1,
    energyPoints: 1,
    duration: -1,
    description:
      '(жизнь, баф) Не позволяет противнику снимать с вас бафы жизни, до тех пока не будтет снят этот баф.',
    dependenciens: [],
  },
  deathspear: {
    russianName: 'Касание смерти',
    actionPoints: 1,
    energyPoints: 1,
    duration: 0,
    description:
      '(смерть, диспел) Позволяет снять любой баф с противника, срабатывает с вероятностью 66%. Не забудьте выбрать цель.',
    dependenciens: [
      'fireshield',
      'firecrown',
      'firepower',
      'watershield',
      'watercrown',
      'watersphere',
      'waterstamp',
      'waterpower',
      'earthshield',
      'earthcrown',
      'earthsource',
      'earthstamp',
      'earthpower',
      'airsource',
      'airpower',
      'lifeshield',
      'lifesphere',
      'lifestamp',
      'lifeflow',
      'lifepower',
      'deathkey',
    ],
  },
  deathshield: {
    russianName: 'Пелена смерти',
    actionPoints: 1,
    energyPoints: 1,
    duration: 4,
    description:
      '(смерть, дебаф) Снижает вероятность успешного наложения бафов на 50%, на четыре хода.',
    dependenciens: [],
  },
  deathcrown: {
    russianName: 'Корона мертвеца',
    actionPoints: 1,
    energyPoints: 1,
    duration: 0,
    description:
      '(смерть, другое) Уменьшает максимальный запас здоровья противника на 15 единиц.',
    dependenciens: [],
  },
  deathsource: {
    russianName: 'Смерть',
    actionPoints: 1,
    energyPoints: 1,
    duration: 0,
    description: '(смерть, другое) Убивает противника с вероятностью 5%.',
    dependenciens: [],
  },
  deathsphere: {
    russianName: 'Круг смерти',
    actionPoints: 1,
    energyPoints: 1,
    duration: 2,
    description:
      '(смерть, дебаф) Увеличивает урон от накладываемых дебафов на 15 единиц за ход, действует два хода.',
    dependenciens: [],
  },
  deathstamp: {
    russianName: 'Печать смерти',
    actionPoints: 1,
    energyPoints: 1,
    duration: 2,
    description:
      '(смерть, дебаф) Не позволяет накладывать бафы, действует два хода.',
    dependenciens: [],
  },
  deathkey: {
    russianName: 'Ключ от смерти',
    actionPoints: 1,
    energyPoints: 1,
    duration: 4,
    description:
      '(смерть, баф) Если у вас закончится запас здоровья, с вероятностью 50% оно восстановится до единицы. Действует четыре хода.',
    dependenciens: [],
  },
  deathflow: {
    russianName: 'Поток смерти',
    actionPoints: 1,
    energyPoints: 1,
    duration: 5,
    description:
      '(смерть, дебаф) В течении пяти ходов наносит противнику пять единиц урона и восстанавливает вам пять единиц здоровья.',
    dependenciens: [],
  },
  deathpower: {
    russianName: 'Власть смерти',
    actionPoints: 1,
    energyPoints: 1,
    duration: 0,
    description:
      '(смерть, диспел) Позволяет снять с противника баф жизни. Не забудьте выбрать цель.',
    dependenciens: [
      'lifeshield',
      'lifesphere',
      'lifestamp',
      'lifeflow',
      'lifepower',
    ],
  },
};

export const reducer = createReducer(initialState);
