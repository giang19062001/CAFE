import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import api from "../http/api";

export default function Order({ navigation, router }) {
  const [data, setData] = React.useState([]);
  const formatter = new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  });
  useEffect(() => {
    async function fetchData() {
      await api
        .get(`/api/order`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchData();
  }, []);

  console.log(data);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {data.map((item) => (
          <View key={item._id}>
            <View style={styles.view}>
              <View style={styles.viewChildOrder}>
                {item?.orderDetail?.map((itemChildOrder) => (
                  <View
                    key={itemChildOrder._id}
                    style={styles.viewChildOrderFood}
                  >
                    <Image
                      source={{
                        uri: `http://localhost:8000/food/${itemChildOrder?.photo}`,
                      }}
                      style={styles.image}
                    />
                    <View>
                      <Text>{itemChildOrder.name}</Text>
                      <Text style={styles.price}>
                        {formatter.format(itemChildOrder.price)}
                      </Text>
                      <Text>Số lượng: {itemChildOrder.quantity}</Text>
                    </View>
                  </View>
                ))}
              </View>
              <View style={styles.viewDescription}>
                <Text>
                  Tổng hóa đơn:{" "}
                  <Text style={styles.price}>
                    {formatter.format(item.total)}
                  </Text>
                </Text>
                <Text> {new Date(item.createdAt).toLocaleString()}</Text>

                {item.status === "Đã xong" ? (
                  <Text style={styles.statusSuccess}> {item.status}</Text>
                ) : (
                  <Text style={styles.statusProcessing}> {item.status}</Text>
                )}
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "tomato",
                borderBottomWidth: "2px",
                marginTop: 10,
                marginBottom: 10,
              }}
            />
          </View>
        ))}
        <StatusBar />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  image: {
    width: 50,
    height: 50,
  },
  view: {
    flex: 1,
    flexDirection: "row",
  },
  viewDescription: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  viewChildOrder: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  viewChildOrderFood: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  price: {
    color: "red",
    fontWeight: "bold",
  },
  statusSuccess: {
    backgroundColor: "#22c55e",
    color: "white",
    fontWeight: "bold",
    borderRadius: 20,
    padding: 5,
    textAlign: "center",
    width: "max-content",
  },
  statusProcessing: {
    backgroundColor: "#facc15",
    color: "white",
    fontWeight: "bold",
    borderRadius: 20,
    padding: 2,
    padding: 5,
    textAlign: "center",
    width: "max-content",
  },
});
