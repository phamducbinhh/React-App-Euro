export interface IMatchTournament {
  id: number
  status?: number
  name: string
  match: IMatch[]
}

export interface IMatch {
  id: number
  name: string
  logo: string
  isWinner?: number
}

export const dbMatchTournamens: IMatchTournament[] = [
  {
    id: 1,
    name: 'match_1',
    status: 1, // chưa chọn
    match: [
      {
        id: 1,
        name: 'Anh',
        logo: 'https://cdn.britannica.com/44/344-050-94536674/Flag-England.jpg'
        // isWinner: 1
      },
      {
        id: 2,
        name: 'Tây Ban Nha',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Spain_%28Civil%29.svg/750px-Flag_of_Spain_%28Civil%29.svg.png'
      }
    ]
  },
  {
    id: 2,
    name: 'match_2',
    status: 1, // đã dự đoán
    match: [
      {
        id: 1,
        name: 'Đức',
        logo: 'https://m.media-amazon.com/images/I/410y4t103AL._AC_UF894,1000_QL80_.jpg'
      },
      {
        id: 2,
        name: 'Pháp',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Flag_of_France.png'
        // isWinner: 1
      }
    ]
  },
  {
    id: 3,
    name: 'match_3',
    status: 1, // chưa chọn
    match: [
      {
        id: 1,
        name: 'Hà Lan',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIxl5hWzIdbkJkDkvpPQXuZAZdTy_E_Ybb8g&usqp=CAU'
      },
      {
        id: 2,
        name: 'Bỉ',
        logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ0AAAC7CAMAAABIKDvmAAAAh1BMVEUAAAD64ELtKTlfVRn/6ET750LwZTvtITn////tJjYxJRLwTFjsAB3tLj3vQE3xaXL6z9HsGi7sCCT2o6jsEin5xsl8cWb2naOnn5j84eL3rbJ7dXDziY9INSDxYGrwUV3Nx8GVkYxgUUQgFwEIBwH28++UioC9s6vyeoKGfHMQAADb1tKIgnwHFXXAAAAB80lEQVR4nO3Uy1biQBSG0erqW5UdlMQoiqA23rXf//kEYoDV42RQi/1Nznyv9Z+Qdt3/XT08hsH6/uPbOP389TsO1eT0bDbdE4Sv+/Q8nENBGjHnusnn/2m8DG1RisZWpI0XhxqXw2MUpLH2qBZ7jdUIGEVpxNi89hpvY2AUphGbWacxws8oUCNW063GOBjFaeS40bii0dXO1xrvNLryJIWPkTDK04jVdRhrKAVqtPNwQ6OvXoQljb58G05o7DTuaBxo/KFBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwYNGjRo0KBBgwaNQTXuwpLGTuM23NDoqxfhikZfOw8fNPqq65DeaXTlSQpprKkUp9HO1xqJxrYc00bjhcamarrVSG80YmxmqdNIKxrNa+o10uWRa+RqkfYaY/yOcjRymy/SoUZ6ej5OjZzrpj7/QthprLv/t3x4PDKNyenZbLon+AT6lfBu+rQyQAAAAABJRU5ErkJggg=='
      }
    ]
  },
  {
    id: 4,
    name: 'match_4',
    status: 1, // chưa chọn
    match: [
      {
        id: 1,
        name: 'Bồ Đào Nha',
        logo: 'https://uxwing.com/wp-content/themes/uxwing/download/flags-landmarks/portugal-flag-icon.png'
      },
      {
        id: 2,
        name: 'Croatia',
        logo: 'https://uxwing.com/wp-content/themes/uxwing/download/flags-landmarks/croatia-flag-icon.png'
      }
    ]
  },
  {
    id: 5,
    name: 'match_5',
    status: 1, // chưa chọn
    match: [
      {
        id: 1,
        name: 'Thổ Nhĩ Kỳ',
        logo: 'https://uxwing.com/wp-content/themes/uxwing/download/flags-landmarks/turkey-flag-icon.png'
      },
      {
        id: 2,
        name: 'Ba Lan',
        logo: 'https://uxwing.com/wp-content/themes/uxwing/download/flags-landmarks/poland-flag-icon.png'
      }
    ]
  }
]
