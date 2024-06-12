import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import {
  GET_AUTHENTICATED_USER,
  GET_USER_AND_TRANSACTIONS,
} from "../graphql/queries/user.query";
import Card from "./Card";
import { useQuery } from "@apollo/client";

const Cards = () => {
  const { data, loading } = useQuery(GET_TRANSACTIONS);
  const { data: authUser } = useQuery(GET_AUTHENTICATED_USER);

  const { data: userAndTransaction } = useQuery(GET_USER_AND_TRANSACTIONS, {
    variables: {
      userId: authUser?.authUser?._id,
    },
  });
  console.log(userAndTransaction, "userAndTransation");
  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">History</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {data.transactions.map((transaction) => (
          <Card
            key={transaction._id}
            transaction={transaction}
            authUser={authUser.authUser}
          />
        ))}
      </div>
      {!loading && data?.transactions?.length === 0 && (
        <p className="text-2xl font-bold text-center w-full">
          No Transaction History found
        </p>
      )}
    </div>
  );
};
export default Cards;
