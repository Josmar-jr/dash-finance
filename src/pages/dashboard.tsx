import { Flex, Box, Text, theme, HStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { HighlightCard } from "../components/HighlightCard";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

import styles from "../styles/apexChart.module.css";
import { withSSRAuth } from "../utils/withSSRAuth";
import { setupAPIClient } from "../services/api";
import { useCan } from "../hooks/useCan";
import { Can } from "../components/Can";

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[200],
  },
  grid: {
    borderColor: theme.colors.gray[600],
  },

  dataLabels: {
    enabled: false,
  },

  tooltip: {
    theme: "dark",
    x: {
      show: false,
    },

    custom: ({ series, seriesIndex, dataPointIndex, w }: any) => {
      return `<div className=${styles.modalChart}">
                  <p><strong>${w.globals.seriesNames[seriesIndex]}</strong>: ${series[seriesIndex][dataPointIndex]}</p>
                  <p><strong>Data da leitura</strong>: </p>
                  <p><strong>Observações</strong>: Você gastou demais</p>
                </div>`;
    },
  },

  xaxis: {
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: ["19 Mai", "23 Jun", "26 Jun", "02 Jul", "14 Ago", "30 Set"],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.8,
      opacityTo: 0.4,
    },
  },
  legend: {
    labels: {
      colors: undefined,
      useSeriesColors: false,
    },
  },
};

const series = [
  {
    name: "Entradas",
    data: [100, 200, 150, 320, 50, 260],
    color: theme.colors.green[500],
  },
  {
    name: "Saídas",
    data: [200, 100, 450, 120, 30, 460],
    color: theme.colors.red[500],
  },
  {
    name: "Total",
    data: [400, 200, 550, 120, 870, 60],
    color: theme.colors.blue[500],
  },
];

export default function Dashboard() {
  return (
    <>
      <Can permissions={["metrics.list"]}>
        <Flex direction="column" h="100vh">
          <Header />

          <Flex w="full" mt="12" maxW={1480} mx="auto" px="4">
            <Sidebar />

            <Flex flexDir="column" flex="1" align="flex-start">
              <HStack spacing="16">
                <HighlightCard
                  title="Entradas"
                  amount={3500}
                  lastTransaction="Última entrada 13 de Abril"
                  type="up"
                />

                <HighlightCard
                  title="Saídas"
                  amount={1000}
                  lastTransaction="Última saída 05 de Abril"
                  type="down"
                />

                <HighlightCard
                  title="Total"
                  amount={2500}
                  lastTransaction="01 à 16 de Abril"
                  type="total"
                />
              </HStack>
              <Box p="4" borderRadius={8}>
                <Text fontSize="lg" mb="4">
                  Transactions
                </Text>

                <Chart
                  options={options}
                  series={series}
                  type="area"
                  height={280}
                  width={800}
                />
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/me");

  console.log(response.data);

  return {
    props: {},
  };
});
