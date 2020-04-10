import React, {useCallback, useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../../common/Loader';

export const ReviewsListPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [list, setList] = useState(null);
  const listType = useParams().type;

  const getList = useCallback(async () => {
    try {
      const fetched = await request(`/api/review`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      setList(fetched);
    } catch (e) {}
  }, [token, listType, request]);

  useEffect(() => {
    getList();
  }, [getList]);

  if (loading) {
    return <Loader />;
  }
  return <>{!loading && list && <div>asd</div>}</>;
};


  // <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
  //   <Grid item xs={12}>
  //     <button>
  //       <svg
  //         onClick={getList}
  //       >
  //         <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  //       </svg>
  //     </button>
  //   </Grid>
  // </Grid>
