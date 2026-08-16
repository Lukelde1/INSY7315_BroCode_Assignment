package com.example.accounts4schools

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.Composable
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.example.accounts4schools.model.PaymentMethod
import com.example.accounts4schools.navigation.AppRoutes
import com.example.accounts4schools.navigation.DrawerDestination
import com.example.accounts4schools.screens.ConfirmationScreen
import com.example.accounts4schools.screens.HomeScreen
import com.example.accounts4schools.screens.LoginScreen
import com.example.accounts4schools.screens.NetcashHandoffScreen
import com.example.accounts4schools.screens.NotificationsScreen
import com.example.accounts4schools.screens.PaymentScreen
import com.example.accounts4schools.screens.ProfileScreen
import com.example.accounts4schools.screens.RegisterScreen
import com.example.accounts4schools.screens.StatementScreen
import com.example.accounts4schools.ui.theme.Accounts4SchoolsTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            Accounts4SchoolsTheme {
                Accounts4SchoolsApp()
            }
        }
    }
}

@Composable
private fun Accounts4SchoolsApp() {
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = AppRoutes.Login
    ) {
        composable(AppRoutes.Login) {
            LoginScreen(
                onLoginClicked = {
                    navController.navigate(AppRoutes.Home) {
                        popUpTo(AppRoutes.Login) { inclusive = true }
                    }
                },
                onRegisterClicked = { navController.navigate(AppRoutes.Register) }
            )
        }

        composable(AppRoutes.Register) {
            RegisterScreen(
                onRegisterClicked = {
                    navController.navigate(AppRoutes.Home) {
                        popUpTo(AppRoutes.Login) { inclusive = true }
                    }
                },
                onBackToLoginClicked = { navController.popBackStack() }
            )
        }

        composable(AppRoutes.Home) {
            HomeScreen(
                onDestinationSelected = { navController.navigateDrawer(it) },
                onStatementClicked = { navController.navigateDrawer(DrawerDestination.Statement) },
                onPaymentClicked = { navController.navigateDrawer(DrawerDestination.Payment) },
                onProfileClicked = { navController.navigateDrawer(DrawerDestination.Profile) },
                onNotificationsClicked = { navController.navigateDrawer(DrawerDestination.Notifications) }
            )
        }

        composable(AppRoutes.Statement) {
            StatementScreen(
                onDestinationSelected = { navController.navigateDrawer(it) },
                onNotificationsClicked = { navController.navigateDrawer(DrawerDestination.Notifications) }
            )
        }

        composable(AppRoutes.Payment) {
            PaymentScreen(
                onDestinationSelected = { navController.navigateDrawer(it) },
                onNotificationsClicked = { navController.navigateDrawer(DrawerDestination.Notifications) },
                onPayWithNetcashClicked = { amount, method ->
                    navController.navigate(AppRoutes.netcash(amount, method.name))
                }
            )
        }

        composable(
            route = AppRoutes.Netcash,
            arguments = listOf(
                navArgument("amount") { type = NavType.StringType },
                navArgument("method") { type = NavType.StringType }
            )
        ) { backStackEntry ->
            val amount = backStackEntry.arguments?.getString("amount")?.toDoubleOrNull() ?: 0.0
            val method = runCatching {
                PaymentMethod.valueOf(backStackEntry.arguments?.getString("method").orEmpty())
            }.getOrDefault(PaymentMethod.CARD)

            NetcashHandoffScreen(
                amount = amount,
                paymentMethod = method,
                onHandoffComplete = { amt, m ->
                    navController.navigate(AppRoutes.confirmation(amt.toString(), m.name)) {
                        popUpTo(AppRoutes.Netcash) { inclusive = true }
                    }
                },
                onBackClicked = { navController.popBackStack() }
            )
        }

        composable(
            route = AppRoutes.Confirmation,
            arguments = listOf(
                navArgument("amount") { type = NavType.StringType },
                navArgument("method") { type = NavType.StringType }
            )
        ) { backStackEntry ->
            val amount = backStackEntry.arguments?.getString("amount")?.toDoubleOrNull() ?: 0.0
            val method = runCatching {
                PaymentMethod.valueOf(backStackEntry.arguments?.getString("method").orEmpty())
            }.getOrDefault(PaymentMethod.CARD)

            ConfirmationScreen(
                amount = amount,
                paymentMethod = method,
                onBackToHomeClicked = {
                    navController.navigate(AppRoutes.Home) {
                        popUpTo(AppRoutes.Home) { inclusive = true }
                        launchSingleTop = true
                    }
                }
            )
        }

        composable(AppRoutes.Profile) {
            ProfileScreen(
                onDestinationSelected = { navController.navigateDrawer(it) },
                onNotificationsClicked = { navController.navigateDrawer(DrawerDestination.Notifications) }
            )
        }

        composable(AppRoutes.Notifications) {
            NotificationsScreen(
                onDestinationSelected = { navController.navigateDrawer(it) }
            )
        }
    }
}

private fun NavHostController.navigateDrawer(destination: DrawerDestination) {
    navigate(destination.route) {
        popUpTo(graph.findStartDestination().id) {
            saveState = true
        }
        launchSingleTop = true
        restoreState = true
    }
}
