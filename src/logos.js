// Real brand logos via the Simple Icons CDN (colored, official marks).
// https://cdn.simpleicons.org/{slug} — see https://simpleicons.org for the full slug list.
export const logo = (slug) => `https://cdn.simpleicons.org/${slug}`;

export const LOGOS = {
  python: logo('python'),
  pandas: logo('pandas'),
  numpy: logo('numpy'),
  jupyter: logo('jupyter'),
  matplotlib: logo('matplotlib'),
  plotly: logo('plotly'),
  streamlit: logo('streamlit'),
  github: logo('github'),
  postgresql: logo('postgresql'),
  scikitlearn: logo('scikitlearn'),
  powerbi: '/powerbi.svg',       
  excel: '/excel.svg', 
};
