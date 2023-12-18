export const filterOptions = [
  {
    key: 'uploadDate',
    label: 'UPLOAD DATE',
    options: [
      { label: 'Last hour', value: 'hour' },
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
    getOptions: (selectedType: string) => {
      if (selectedType === 'channels') {
        return [
          { label: 'Date', value: 'publishedAt' },
          { label: 'Views', value: 'viewCount' },
          { label: 'Subscribers', value: 'subscriberCount' },
        ];
      } else {
        return [
          { label: 'Date', value: 'publishedAt' },
          { label: 'Views', value: 'viewCount' },
          { label: 'Rating', value: 'likeCount' },
        ];
      }
    },
  },
];
