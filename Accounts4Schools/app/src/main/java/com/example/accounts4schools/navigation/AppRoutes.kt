package com.example.accounts4schools.navigation

object AppRoutes {
    const val Login = "login"
    const val Register = "register"
    const val Home = "home"
    const val Statement = "statement"
    const val Payment = "payment"
    const val Netcash = "netcash/{amount}/{method}"
    const val Confirmation = "confirmation/{amount}/{method}"
    const val Profile = "profile"
    const val Notifications = "notifications"

    fun netcash(amount: String, method: String): String = "netcash/$amount/$method"
    fun confirmation(amount: String, method: String): String = "confirmation/$amount/$method"
}

enum class DrawerDestination(
    val route: String,
    val label: String
) {
    Home(AppRoutes.Home, "Home"),
    Statement(AppRoutes.Statement, "Statement"),
    Payment(AppRoutes.Payment, "Make a payment"),
    Notifications(AppRoutes.Notifications, "Notifications"),
    Profile(AppRoutes.Profile, "Profile")
}
