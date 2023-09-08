import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Pagination, HitsPerPage } from 'react-instantsearch';
import { useHits } from 'react-instantsearch';
import Typography from '@mui/material/Typography';
import 'instantsearch.css/themes/satellite.css';

const searchClient = algoliasearch('WD6VZ40OGV', '3797c53026949327da8d97616d2efc7e');

function Hit({ hit, key }: any) {
  return (
    <article
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#e3d9c6',
        borderRadius: '25px',
        border: '1px solid #888',
        padding: '15px',
      }}
      key={key}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, fontWeight: 'bold', fontFamily: 'Monospace' }}
      >
        {hit.code + ': ' + hit.name}
      </Typography>
      <Typography variant="body1" component="div" sx={{ flexGrow: 1, fontFamily: 'Monospace' }}>
        {'Department: ' + hit.department}
      </Typography>
      <Typography variant="body1" component="div" sx={{ flexGrow: 1, fontFamily: 'Monospace' }}>
        {'Hours: ' + hit.hours}
      </Typography>
      <Typography variant="body2" component="div" sx={{ flexGrow: 1, fontFamily: 'Monospace' }}>
        {'Description: ' + hit.description}
      </Typography>
    </article>
  );
}

function CustomHits(props: any) {
  const hits = useHits(props);
  // console.log(hits);
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '500px',
        maxWidth: '50%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {hits.hits.length > 0 ? (
        hits.hits.map((hit: any) => <Hit hit={hit} key={hit.objectID} />)
      ) : (
        <Typography
          variant="h3"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            fontFamily: 'Monospace',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          No Courses Found
        </Typography>
      )}
    </div>
  );
}

function Search({}: any) {
  return (
    <div
      id="main div"
      style="height: 100%; width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #E0D5C0;"
    >
      <Typography
        variant="h3"
        component="div"
        sx={{ flexGrow: 1, fontFamily: 'Monospace', fontWeight: 'bold', p: 1 }}
      >
        Search
      </Typography>
      <InstantSearch searchClient={searchClient} indexName="vanderbiltcoursecatalogdatabase">
        <div style="height: 100%; width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <div style={{ width: '50%' }}>
            <Typography
              variant="h6"
              component="SearchBox"
              sx={{ flexGrow: 1, fontFamily: 'Monospace', width: '50%', p: 2 }}
            >
              <SearchBox />
            </Typography>
          </div>
        </div>
        <CustomHits />
        <Typography
          variant="body1"
          component="Pagination"
          sx={{ flexGrow: 1, fontFamily: 'Monospace', pt: 2 }}
        >
          <Pagination />
        </Typography>
        <Typography
          variant="body1"
          component="HitsPerPage"
          sx={{ flexGrow: 1, fontFamily: 'Monospace', pt: 2, pb: 2 }}
        >
          <HitsPerPage
            items={[
              { label: '5 hits per page', value: 5, default: true },
              { label: '10 hits per page', value: 10 },
              { label: '16 hits per page', value: 16 },
              { label: '25 hits per page', value: 25 },
            ]}
          />
        </Typography>
      </InstantSearch>
    </div>
  );
}

export { Search };
