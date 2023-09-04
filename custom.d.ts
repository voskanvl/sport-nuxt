declare type href = string
declare type date = string
declare type image = string
declare type year = number
declare interface Winner {
    id: number
    name: string
    shortName: string
    tla: string
    crest: image
    address: string
    website: href
    founded: year
    clubColors: string
    venue: string
    lastUpdated: Date
}
declare interface Season {
    id: number
    startDate: string
    endDate: string
    currentMatchday: number
    winner: Winner | null
}
declare interface League {
    area: {
        id: number
        name: string
        code: string
        flag: href | null
    }
    id: number
    name: string
    code: string
    type: string
    emblem: href 
    currentSeason: Season
    seasons: Season[]
}
declare interface Competitions {
    competitions: {
        id: number
        area: {
            id: number
            name: string
            code: string
            flag: href
        }
        name: string
        code: string
        type: string
        emblem: href
        plan: string
        currentSeason: {
            id: number
            startDate: string
            endDate: string
            currentMatchday: number
            winner: Winner | null
        }
        numberOfAvailableSeasons: 7
        lastUpdated: date
    }[]
}
declare interface Coach {
    id: 45595
    firstName: string
    lastName: string
    name: string
    dateOfBirth: date
    nationality: string
    contract: {
        start: date
        until: date
    }
}
declare interface Player {
    id: number
    name: string
    position: string
    dateOfBirth: date
    nationality: string
}
declare interface Team {
    id: number
    name: string
    shortName: string
    tla: string
    crest: href
    address: string
    website: href
    founded: year
    clubColors: string
    venue: string
    lastUpdated: date
    runningCompetitions: {
        id: number
        name: string
        code: string
        type: string
        emblem: href
    }[]
    coach: Coach
    squad: Player[]
}
declare interface Teams {
    count: number
    filters: {
        limit: number
        offset: number
        permission: string
    }
    teams: Team[]
    staff: unknown[]
    lastUpdated: date
}
declare interface StandingTableItem {
    position: number
    team: Pick<Team, "id" | "name" | "shortName" | "tla" | "crest">
    playedGames: number
    form: string
    won: number
    draw: number
    lost: number
    points: number
    goalsFor: number
    goalsAgainst: number
    goalDifference: number
}
declare interface StandingPage {
    filters: {
        season: string
    }
    area: {
        id: number
        name: string
        code: string
        flag: href
    }
    competition: {
        id: number
        name: string
        code: string
        type: string
        emblem: href
    }
    season: {
        id: number
        startDate: date
        endDate: date
        currentMatchday: number
        winner: Winner | null
    }
    standings: {
        stage: string
        type: "TOTAL" | "HOME" | "AWAY" | null
        group: null
        table: StandingTableItem[]
    }[]
}
declare interface Match {
    area: {
        id: number
        name: string
        code: string
        flag: href
    }
    competition: {
        id: number
        name: string
        code: string
        type: string
        emblem: href
    }
    season: {
        id: number
        startDate: date
        endDate: date
        currentMatchday: 3
        winner: Winner | null
    }
    id: number
    utcDate: date
    status: "FINISHED" | "TIMED" | "SCHEDULED"
    matchday: number
    stage: string
    group: null
    lastUpdated: date
    homeTeam: Pick<Team, "id" | "name" | "shortName" | "tla" | "crest">
    awayTeam: Pick<Team, "id" | "name" | "shortName" | "tla" | "crest">
    score: {
        winner: string
        duration: string
        fullTime: {
            home: number
            away: number
        }
        halfTime: {
            away: number
            home: number
        }
    }
    odds: {
        msg: string
    }
    referees: [
        {
            id: number
            name: string
            type: string
            nationality: string
        },
    ]
}
declare interface Matches{
    filters: {
        competitions: string,
        permission: string,
        limit: number
    },
    resultSet: {
        count: number,
        competitions: string,
        first: date,
        last: date,
        played: number,
        wins: number,
        draws: number,
        losses: number
    },
    matches: Match[]
}
declare interface Person {
    id: number
    name: string
    firstName: string
    lastName: string
    dateOfBirth: date
    nationality: string
    section: string
    position: string
    shirtNumber: number
    lastUpdated: date
    currentTeam: {
        area: {
            id: number
            name: string
            code: string
            flag: href
        }
        id: number
        name: string
        shortName: string
        tla: string
        crest: href
        address: string
        website: href
        founded: number
        clubColors: string
        venue: string
        runningCompetitions: [
            {
                id: number
                name: string
                code: string
                type: string
                emblem: href | null
            },
        ]
        contract: {
            start: date
            until: null
        }
    }
}