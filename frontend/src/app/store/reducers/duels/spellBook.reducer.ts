import { createReducer } from '@ngrx/store';

export interface SpellbookState {
  firespear: [string, number, number, string, string[]];
  fireshild: [string, number, number, string, string[]];
  firecrown: [string, number, number, string, string[]];
  firesource: [string, number, number, string, string[]];
  firesphere: [string, number, number, string, string[]];
  firestamp: [string, number, number, string, string[]];
  firekey: [string, number, number, string, string[]];
  fireflow: [string, number, number, string, string[]];
  firepower: [string, number, number, string, string[]];
  waterspear: [string, number, number, string, string[]];
  watershild: [string, number, number, string, string[]];
  watercrown: [string, number, number, string, string[]];
  watersource: [string, number, number, string, string[]];
  watersphere: [string, number, number, string, string[]];
  waterstamp: [string, number, number, string, string[]];
  waterkey: [string, number, number, string, string[]];
  waterflow: [string, number, number, string, string[]];
  waterpower: [string, number, number, string, string[]];
  earthspear: [string, number, number, string, string[]];
  earthshild: [string, number, number, string, string[]];
  earthcrown: [string, number, number, string, string[]];
  earthsource: [string, number, number, string, string[]];
  earthsphere: [string, number, number, string, string[]];
  earthstamp: [string, number, number, string, string[]];
  earthkey: [string, number, number, string, string[]];
  earthflow: [string, number, number, string, string[]];
  earthpower: [string, number, number, string, string[]];
  airspear: [string, number, number, string, string[]];
  airshild: [string, number, number, string, string[]];
  aircrown: [string, number, number, string, string[]];
  airsource: [string, number, number, string, string[]];
  airsphere: [string, number, number, string, string[]];
  airstamp: [string, number, number, string, string[]];
  airkey: [string, number, number, string, string[]];
  airflow: [string, number, number, string, string[]];
  airpower: [string, number, number, string, string[]];
  lifespear: [string, number, number, string, string[]];
  lifeshild: [string, number, number, string, string[]];
  lifecrown: [string, number, number, string, string[]];
  lifesource: [string, number, number, string, string[]];
  lifesphere: [string, number, number, string, string[]];
  lifestamp: [string, number, number, string, string[]];
  lifekey: [string, number, number, string, string[]];
  lifeflow: [string, number, number, string, string[]];
  lifepower: [string, number, number, string, string[]];
  deathspear: [string, number, number, string, string[]];
  deathshild: [string, number, number, string, string[]];
  deathcrown: [string, number, number, string, string[]];
  deathsource: [string, number, number, string, string[]];
  deathsphere: [string, number, number, string, string[]];
  deathstamp: [string, number, number, string, string[]];
  deathkey: [string, number, number, string, string[]];
  deathflow: [string, number, number, string, string[]];
  deathpower: [string, number, number, string, string[]];
}

// [russian name, action points, energy points, spell description, dependenciens]

const initialState: SpellbookState = {
  firespear: [
    'Метеор',
    1,
    1,
    '(огонь, прямой урон) Наносит урон противнику от 20 до 30 единиц.',
    [],
  ],
  fireshild: [
    'Огненный щит',
    1,
    1,
    '(огонь, баф) В течении четырех ходов снижает на 40% урон от дебафов.',
    [],
  ],
  firecrown: [
    'Огненный венец',
    1,
    1,
    '(огонь, баф) В течении четырех ходов усиливает ваши атакующие заклинания на 25%.',
    [],
  ],
  firesource: [
    'Вулкан',
    1,
    1,
    '(огонь, дебаф) В течении трех ходов, каждый ход наносит от 5 до 12 единиц урона.',
    [],
  ],
  firesphere: [
    'Огненная клетка',
    1,
    1,
    '(огонь, дебаф) При получении прямого урона наносит 5-10 единиц урона от клетки, действует постоянно.',
    [],
  ],
  firestamp: [
    'Клеймо огня',
    1,
    1,
    '(огонь, другое) Увеличивает продолжительность всех наложенных на врага дебафов на два хода.',
    [],
  ],
  firekey: [
    'Ключ огня',
    1,
    1,
    '(огонь, диспел) Снимает с противника баф воды или земли. Не забудьте выбрать цель.',
    [
      'watershild',
      'watercrown',
      'watersphere',
      'waterstamp',
      'waterpower',
      'earthshild',
      'earthcrown',
      'earthsource',
      'earthstamp',
      'earthpower',
    ],
  ],
  fireflow: [
    'Струя пламени',
    1,
    1,
    '(огонь, прямой урон) Наносит противнику урон от 25 до 35 единиц, попадает в цель с вероятностью 66%.',
    [],
  ],
  firepower: [
    'Власть огня',
    1,
    1,
    '(огонь, баф) Постоянно увеличивает урон от атакующих огненных заклинаний на 5 единиц.',
    [],
  ],
  waterspear: [
    'Ледяной осколок',
    1,
    1,
    '(вода, прямой урон) Наносит противнику от 5 до 15 единиц урона, за каждый дебаф, наложенный на противника, наносимый урон дополнительно увеличивается на 5.',
    [],
  ],
  watershild: [
    'Ледяная стена',
    1,
    1,
    '(вода, баф) В течении шести ходов снижает урон от атакующих заклинаний на 40%.',
    [],
  ],
  watercrown: [
    'Корона воды',
    1,
    1,
    '(вода, баф) Снижает урон от дебафов на 50%, действует шесть ходов.',
    [],
  ],
  watersource: [
    'Родник',
    1,
    1,
    '(вода, диспел) Позволяет снять дебаф огня, воды, земли или воздуха с вероятностью 66%. Не забудьте выбрать цель.',
    [
      'firesource',
      'firesphere',
      'earthsphere',
      'airshild',
      'aircrown',
      'airsphere',
      'airstamp',
    ],
  ],
  watersphere: [
    'Ледяная сфера',
    1,
    1,
    '(вода, дебаф) Замораживает часть карты, размером 4х4 клетки. Игрок находящейся внутри данной области получит 20 единиц урона в конце хода.',
    [],
  ],
  waterstamp: [
    'Печать воды',
    1,
    1,
    '(вода, баф) В течении шести ходов блокирует треть урона от атакующих заклинаний.',
    [],
  ],
  waterkey: [
    'Ключ воды',
    1,
    1,
    '(вода, диспел) Позволяет снять дебаф огня или воздуха. Не забудьте выбрать цель.',
    ['firesource', 'firesphere', 'airshild', 'aircrown', 'airsphere'],
  ],
  waterflow: [
    'Водный поток',
    1,
    1,
    '(вода, прямой урон) Наносит 20 единиц урона.',
    [],
  ],
  waterpower: [
    'Власть воды',
    1,
    1,
    '(вода, баф) Постоянно увеличивает срок действия водных бафов на два хода.',
    [],
  ],
  earthspear: [
    'Глыба',
    1,
    1,
    '(земля, прямой урон) Наносит урон противнику от 50 до 70 единиц. Попадает в цель с вероятностью 33%',
    [],
  ],
  earthshild: [
    'Скала',
    1,
    1,
    '(земля, блок) Полностью блокирует заклинания обоих игроков, если находится между ними. Действует пять ходов.',
    [],
  ],
  earthcrown: [
    'Корона земли',
    1,
    1,
    '(земля, баф) На шесть ходов увеличивает вероятность попаданя по противнику атакующими заклинаниями на 15%.',
    [],
  ],
  earthsource: [
    'Земные недра',
    1,
    1,
    '(земля, баф) Увеличивает урон от атакующих земных заклинаний на 15 единиц, увеличивает длительность дебафов земли на один ход, действует четыре хода.',
    [],
  ],
  earthsphere: [
    'Склеп',
    1,
    1,
    '(земля, дебаф) Увеличивает вероятность попадания по противнику дебафами и заклинаниями урона на 5%, на десять ходов.',
    [],
  ],
  earthstamp: [
    'Печать земли',
    1,
    1,
    '(земля, баф) В течении четырех ходов блокирует половину урона от атакующих заклинаний.',
    [],
  ],
  earthkey: [
    'Ключ земли',
    1,
    1,
    '(земля, диспел) Позволяет снять дебаф огня или воздуха. Не забудьте выбрать цель.',
    [
      'firesource',
      'firesphere',
      'airshild',
      'aircrown',
      'airsphere',
      'airstamp',
    ],
  ],
  earthflow: [
    'Сель',
    1,
    1,
    '(земля, прямой урон) Наносит 80 единиц урона, попадает в цель с вероятностью 25%.',
    [],
  ],
  earthpower: [
    'Власть земли',
    1,
    1,
    '(земля, баф) Постоянно увелчивает срок действия бафов земли на четыре хода, срабатывает на каждом бафе с вероятностью 50%, действует четыре хода.',
    [],
  ],
  airspear: [
    'Копье воздуха',
    1,
    1,
    '(воздух, прямой урон) Наносит противнику 25 единиц урона, попадает в цель с вероятностью 75% .',
    [],
  ],
  airshild: [
    'Вихрь',
    1,
    1,
    '(воздух, дебаф) В течении четырех ходов снижает вероятность пападания по противнику заклинаниями урона на 33%.',
    [],
  ],
  aircrown: [
    'Корона воздуха',
    1,
    1,
    '(воздух, дебаф) В течении четырех ходов снижает вероятность успешного наложения бафа на 33%.',
    [],
  ],
  airsource: [
    'Врата воздуха',
    1,
    1,
    '(воздух, баф) В течении шести ходов увеличивает вероятность попадания по противнику дебафами и заклинаниями прямого урона на 10%.',
    [],
  ],
  airsphere: [
    'Воздушный кокон',
    1,
    1,
    '(воздух, дебаф) В течении четырех ходов снижает вероятность попадания дебафом на 33%.',
    [],
  ],
  airstamp: [
    'Печать воздуха',
    1,
    1,
    '(воздух, дебаф) В течении десяти ходов снижает вероятность успешного наложения бафа, на 10%.',
    [],
  ],
  airkey: [
    'Ключ воздуха',
    1,
    1,
    '(воздух, диспел) Позволяет снять с противника баф земли или воды. Не забудьте выбрать цель.',
    [
      'watershild',
      'watercrown',
      'watersphere',
      'waterstamp',
      'waterpower',
      'earthshild',
      'earthcrown',
      'earthsource',
      'earthstamp',
      'earthpower',
    ],
  ],
  airflow: [
    'Ударная волна',
    1,
    1,
    '(воздух, прямой урон) наносит урон противнику 40 единиц. Попадает в цель с вероятностью 50%',
    [],
  ],
  airpower: [
    'Власть воздуха',
    1,
    1,
    '(воздух, баф) Постоянно уменьшает вероятность попадания по вам заклинаниями урона, на 20%.',
    [],
  ],
  lifespear: [
    'Касание жизни',
    1,
    1,
    '(жизнь, диспел) Позволяет снять дебаф смерти. Не забудьте выбрать цель.',
    ['deathshild', 'deathsphere', 'deathstamp', 'deathflow'],
  ],
  lifeshild: [
    'Щит жизни',
    1,
    1,
    '(жизнь, баф) Не позволяет уменьшать максимальный запас здоровья.',
    [],
  ],
  lifecrown: [
    'Корона жизни',
    1,
    1,
    '(жизнь, другое) Увеличивает максимальный запас здоровья на 15 единиц.',
    [],
  ],
  lifesource: [
    'Источник жизни',
    1,
    1,
    '(жизнь, другое) Восстанавливает тридцать единиц здоровья.',
    [],
  ],
  lifesphere: [
    'Сфера восстановления',
    1,
    1,
    '(жизнь, баф) В течении пяти ходов восстанавливает по 10 единиц здоровья.',
    [],
  ],
  lifestamp: [
    'Печать жизни',
    1,
    1,
    '(жизнь, баф) Не позволяет наклдывать дебафы смерти в течении восьми ходов.',
    [],
  ],
  lifekey: [
    'Ключ жизни',
    1,
    1,
    '(жизнь, диспел) Позволяет снять любой дебаф, срабатывает с вероятностью 66%. Не забудьте выбрать цель.',
    [
      'firesource',
      'firesphere',
      'earthsphere',
      'airshild',
      'aircrown',
      'airsphere',
      'airstamp',
      'deathshild',
      'deathsphere',
      'deathstamp',
      'deathflow',
    ],
  ],
  lifeflow: [
    'Поток жизни',
    1,
    1,
    '(жизнь, баф) Восстанавливает по 25 единиц здоровья за ход, действует два хода.',
    [],
  ],
  lifepower: [
    'Власть жизни',
    1,
    1,
    '(жизнь, баф) Не позволяет противнику снимать с вас бафы жизни, до тех пока не будтет снят этот баф.',
    [],
  ],
  deathspear: [
    'Касание смерти',
    1,
    1,
    '(смерть, диспел) Позволяет снять любой баф с противника, срабатывает с вероятностью 66%. Не забудьте выбрать цель.',
    [
      'fireshild',
      'firecrown',
      'firepower',
      'watershild',
      'watercrown',
      'watersphere',
      'waterstamp',
      'waterpower',
      'earthshild',
      'earthcrown',
      'earthsource',
      'earthstamp',
      'earthpower',
      'airsource',
      'airpower',
      'lifeshild',
      'lifesphere',
      'lifestamp',
      'lifeflow',
      'lifepower',
      'deathkey',
    ],
  ],
  deathshild: [
    'Пелена смерти',
    1,
    1,
    '(смерть, дебаф) Снижает вероятность успешного наложения бафов на 50%, на четыре хода.',
    [],
  ],
  deathcrown: [
    'Корона мертвеца',
    1,
    1,
    '(смерть, другое) Уменьшает максимальный запас здоровья противника на 15 единиц.',
    [],
  ],
  deathsource: [
    'Смерть',
    1,
    1,
    '(смерть, другое) Убивает противника с вероятностью 5%.',
    [],
  ],
  deathsphere: [
    'Круг смерти',
    1,
    1,
    '(смерть, дебаф) Увеличивает урон от накладываемых дебафов на 15 единиц за ход, действует два хода.',
    [],
  ],
  deathstamp: [
    'Печать смерти',
    1,
    1,
    '(смерть, дебаф) Не позволяет накладывать бафы, действует два хода.',
    [],
  ],
  deathkey: [
    'Ключ от смерти',
    1,
    1,
    '(смерть, баф) Если у вас закончится запас здоровья, с вероятностью 50% оно восстановится до единицы. Действует четыре хода.',
    [],
  ],
  deathflow: [
    'Поток смерти',
    1,
    1,
    '(смерть, дебаф) В течении пяти ходов наносит противнику пять единиц урона и восстанавливает вам пять единиц здоровья.',
    [],
  ],
  deathpower: [
    'Власть смерти',
    1,
    1,
    '(смерть, диспел) Позволяет снять с противника баф жизни. Не забудьте выбрать цель.',
    ['lifeshild', 'lifesphere', 'lifestamp', 'lifeflow', 'lifepower'],
  ],
};

export const reducer = createReducer(initialState);