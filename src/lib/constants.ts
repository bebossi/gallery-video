export const filterOptions = [
  {
    key: 'uploadDate',
    label: 'UPLOAD DATE',
    options: [
      { label: 'Last hour', value: 'last hour' },
      { label: 'Today', value: 'today' },
      { label: 'This week', value: 'week' },
      { label: 'This month', value: 'month' },
      { label: 'This year', value: 'year' },
    ],
  },
  {
    key: 'type',
    label: 'TYPE',
    options: [
      { label: 'Videos', value: 'videos' },
      { label: 'Playlists', value: 'playlists' },
      { label: 'Channels', value: 'channels' },
    ],
  },
  {
    key: 'sortBy',
    label: 'SORT BY',
    options: [
      { label: 'Date', value: 'date' },
      { label: 'Views', value: 'views' },
      { label: 'Rating', value: 'Rating' },
    ],
  },
];
