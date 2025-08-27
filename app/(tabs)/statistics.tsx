import Header from "@/components/Header";
import Loading from "@/components/Loading";
import Screenwrapper from "@/components/Screenwrapper";
import TransactionList from "@/components/TransactionList";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import {
  fetchmonthlystats,
  fetchweeklystats,
  fetchyarlystats,
} from "@/services/transactionService";
import { scale, verticalScale } from "@/utils/styling";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const Statistics = () => {
  const [chartLoading, setChartLoading] = useState(false);
  const [activeIndex, setactiveIndex] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (activeIndex == 0) {
      getweeklystats();
    }
    if (activeIndex == 1) {
      getmonthlystats();
    }
    if (activeIndex == 2) {
      getyearlystats();
    }
  }, [activeIndex]);

  const getweeklystats = async () => {
    setChartLoading(true);
    let res = await fetchweeklystats(user?.uid as string);
    setChartLoading(false);

    if (res.success) {
      setChartData(res?.data?.stats || []);
      setTransactions(res?.data?.transactions || []);
    } else {
      Alert.alert("Error, ", res.msg);
    }
  };
  const getmonthlystats = async () => {
    setChartLoading(true);
    let res = await fetchmonthlystats(user?.uid as string);
    setChartLoading(false);

    if (res.success) {
      setChartData(res?.data?.stats || []);
      setTransactions(res?.data?.transactions || []);
    } else {
      Alert.alert("Error, ", res.msg);
    }
  };
  const getyearlystats = async () => {
    setChartLoading(true);
    let res = await fetchyarlystats(user?.uid as string);
    setChartLoading(false);

    if (res.success) {
      setChartData(res?.data?.stats || []);
      setTransactions(res?.data?.transactions || []);
    } else {
      Alert.alert("Error, ", res.msg);
    }
  };

  return (
    <Screenwrapper>
      <View style={styles.container}>
        {/* Custom Header */}
        <View style={styles.header}>
          <Header title="Statistics" />
        </View>
        <ScrollView
          contentContainerStyle={{
            gap: spacingY._20,
            paddingTop: spacingY._5,
            paddingBottom: verticalScale(100),
          }}
          showsVerticalScrollIndicator={false}
        >
          <SegmentedControl
            values={["Weekly", "Monthly", "Yearly"]}
            selectedIndex={activeIndex}
            onChange={(event) => {
              setactiveIndex(event.nativeEvent.selectedSegmentIndex);
            }}
            tintColor={colors.neutral200}
            backgroundColor={colors.neutral800}
            appearance="dark"
            activeFontStyle={styles.segmentFontStyle}
            style={styles.segmentStyle}
            fontStyle={{ ...styles.segmentFontStyle, color: colors.white }}
          />
          <View style={styles.chartContainer}>
            {chartData.length > 0 ? (
              <BarChart
                data={chartData}
                barWidth={scale(12)}
                spacing={[1, 2].includes(activeIndex) ? scale(25) : scale(16)}
                roundedTop
                roundedBottom
                hideRules
                yAxisLabelPrefix="₹"
                yAxisThickness={0}
                xAxisThickness={0}
                yAxisLabelWidth={
                  [1, 2].includes(activeIndex) ? scale(38) : scale(35)
                }
                // hideYAxisText
                noOfSections={5}
                minHeight={5}
                // maxValue={100}
                isAnimated={true}
              />
            ) : (
              <View style={styles.noChart} />
            )}
            {chartLoading && (
              <View style={styles.chartLoadingContainer}>
                <Loading color={colors.black} />
              </View>
            )}
          </View>

          {/* Transactions */}
          <View>
            <TransactionList
              title="Transactions"
              emptyListMessage="No Transactions"
              data={transactions}
            />
          </View>
        </ScrollView>
      </View>
    </Screenwrapper>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  searchIcon: {
    backgroundColor: colors.neutral700,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    height: verticalScale(35),
    width: verticalScale(35),
  },
  segmentStyle: {
    height: scale(37),
  },
  segmentFontStyle: {
    fontSize: verticalScale(33),
    fontWeight: "bold",
    color: colors.black,
  },
  container: {
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._5,
    gap: spacingY._10,
  },
  chartContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  chartLoadingContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: radius._12,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: verticalScale(10),
  },
  headerTitle: {
    fontSize: scale(18),
    fontWeight: "bold",
    color: colors.black,
  },
  noChart: {
    backgroundColor: "rgba(0,0,0,0.6)",
    height: verticalScale(210),
  },
});
