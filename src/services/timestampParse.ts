function timeConverter(timestamp: number): string {
  const formatted = new Intl.DateTimeFormat('el-GR', {
    timeStyle: 'medium',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  return formatted.format(new Date(timestamp * 1e3));
}

export default timeConverter;
