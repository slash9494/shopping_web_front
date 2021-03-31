import HomeLayout from "../components/HomeLayout";
import wrapper, { IStore } from "../store/configureStore";
import { authCheckActionAsync } from "../modules";
import { END } from "redux-saga";
import axios from "axios";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("../components/HomeLayout"), {
  loading: () => <p>loading...</p>,
});

function IndexPage() {
  return <DynamicComponent />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch(authCheckActionAsync.request());
    context.store.dispatch(END);
    await (context.store as IStore).sagaTask?.toPromise();
  }
);

export default IndexPage;
