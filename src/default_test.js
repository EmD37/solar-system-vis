import data from './assets/fig.json'

const settings = {
	Settings: {
		StartDate: "2009-07-18",
		EndDate: "2024-07-18",
		MajorBodies: [
			{
				id: 0,
				name: "Sun",
				show: true,
				orbit: false,
				children: []
			},
			{
				id: 10,
				name: "Planets",
				show: true,
				orbit: true,
				children: [
                    {
                        id: 11,
                        name: "Mercury",
                        show: true,
                        orbit: false,
                        children: []
                    },
                    {
                        id: 12,
                        name: "Venus",
                        show: true,
                        orbit: false,
                        children: []
                    },
                    {
                        id: 13,
                        name: "Earth",
                        show: true,
                        orbit: false,
                        children: []
                    },
                    {
                        id: 14,
                        name: "Mars",
                        show: true,
                        orbit: false,
                        children: []
                    },
                    {
                        id: 15,
                        name: "Jupiter",
                        show: true,
                        orbit: false,
                        children: []
                    },
                    {
                        id: 16,
                        name: "Saturn",
                        show: true,
                        orbit: false,
                        children: []
                    },
                    {
                        id: 17,
                        name: "Uranus",
                        show: true,
                        orbit: false,
                        children: []
                    },
                    {
                        id: 18,
                        name: "Neptune",
                        show: true,
                        orbit: false,
                        children: []
                    },
                ]
				
			},
		],
		MinorBodies: [
			{
				id: 20,
				name: "Moons",
				show: true,
				orbit: false,
				children: [
                    {
                        id: 21,
                        name: "Terran",
                        show: true,
                        orbit: false,
                        children: [
                            {
                                id: 211,
                                name: "Luna",
                                show: true,
                                orbit: false,
                                children: []
                            },
                        ]
                    },
                    {
                        id: 22,
                        name: "Martian",
                        show: true,
                        orbit: false,
                        children: [
                            {
                                id: 221,
                                name: "Phobos",
                                show: true,
                                orbit: false,
                                children: []
                            },
                            {
                                id: 222,
                                name: "Deimos",
                                show: true,
                                orbit: false,
                                children: []
                            },
                        ]
                    },
                    {
                        id: 23,
                        name: "Jovian",
                        show: true,
                        orbit: false,
                        children: [
                            {
                                id: 231,
                                name: "Io",
                                show: true,
                                orbit: false,
                                children: []
                            },
                            {
                                id: 232,
                                name: "Europa",
                                show: true,
                                orbit: false,
                                children: []
                            },
                            {
                                id: 233,
                                name: "Ganymede",
                                show: true,
                                orbit: false,
                                children: []
                            },
                            {
                                id: 234,
                                name: "Callisto",
                                show: true,
                                orbit: false,
                                children: []
                            },
                            {
                                id: 235,
                                name: "Kallichore",
                                show: true,
                                orbit: false,
                                children: []
                            },
                            {
                                id: 236,
                                name: "Amalthea",
                                show: true,
                                orbit: false,
                                children: []
                            },
                        ]
                    },
                ]
			},
			{
				id: 30,
				name: "Comets",
				show: false,
				orbit: false,
				children: [
                    {
                        id: 31,
                        name: "Halley's",
                        show: true,
                        orbit: false,
                        children: []
                    },
                    {
                        id: 32,
                        name: "Shoemaker",
                        show: true,
                        orbit: false,
                        children: []
                    },
                    {
                        id: 33,
                        name: "Hayakutake",
                        show: true,
                        orbit: false,
                        children: []
                    },
                ]
			},
			{
				id: 40,
				name: "Planetoids",
				show: true,
				orbit: true,
				children: [
                    {
                        id: 41,
                        name: "Pluto",
                        show: true,
                        orbit: false,
                        children: []
                    },
                    {
                        id: 42,
                        name: "Ceres",
                        show: true,
                        orbit: false,
                        children: []
                    },
                    {
                        id: 43,
                        name: "Vesta",
                        show: true,
                        orbit: false,
                        children: []
                    },
                ]
			},
		],
        Missions: [
			{
				id: 50,
				name: "ESA",
				show: true,
				orbit: false,
				children: [
                    {
                        id: 51,
                        name: "Solar Orbiter",
                        show: true,
                        orbit: false,
                        children: []
                    },
                    {
                        id: 52,
                        name: "Juice",
                        show: true,
                        orbit: false,
                        children: []
                    },
                    {
                        id: 53,
                        name: "BepiColombo",
                        show: true,
                        orbit: false,
                        children: []
                    },
                ]
			},
			{
				id: 60,
				name: "NASA",
				show: true,
				orbit: true,
				children: [
                    {
                        id: 61,
                        name: "Voyager I",
                        show: true,
                        orbit: false,
                        children: []
                    },
                    {
                        id: 62,
                        name: "Voyager II",
                        show: true,
                        orbit: false,
                        children: []
                    },
                    {
                        id: 63,
                        name: "Artemis",
                        show: true,
                        orbit: false,
                        children: []
                    },
                    {
                        id: 64,
                        name: "Cassini",
                        show: true,
                        orbit: false,
                        children: []
                    },
                    {
                        id: 65,
                        name: "Deep Impact",
                        show: true,
                        orbit: false,
                        children: []
                    },
                    {
                        id: 66,
                        name: "Europa Clipper",
                        show: true,
                        orbit: false,
                        children: []
                    },
                    {
                        id: 67,
                        name: "Galileo",
                        show: true,
                        orbit: false,
                        children: []
                    },
                    {
                        id: 68,
                        name: "Messenger",
                        show: true,
                        orbit: false,
                        children: []
                    },
                ]
				
			},
		],	
	}
}

export default function getDefault() {
  return {
    render: JSON.parse(data),
    Settings: settings.Settings
  }
}