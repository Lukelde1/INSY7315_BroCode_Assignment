package com.example.accounts4schools.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val DarkColorScheme = darkColorScheme(
    primary = LightBlue,
    onPrimary = Color.White,
    primaryContainer = Navy,
    onPrimaryContainer = Color.White,
    secondary = LightBlueSoft,
    onSecondary = Navy,
    background = NavyDeep,
    onBackground = Color(0xFFE7F0FF),
    surface = Navy,
    onSurface = Color(0xFFE7F0FF),
    surfaceVariant = Color(0xFF243552),
    onSurfaceVariant = Color(0xFFB7C5DA),
    outline = OutlineSoft,
    error = DangerRed,
    onError = Color.White
)

private val LightColorScheme = lightColorScheme(
    primary = LightBlue,
    onPrimary = Color.White,
    primaryContainer = LightBlueSoft,
    onPrimaryContainer = Navy,
    secondary = Navy,
    onSecondary = Color.White,
    secondaryContainer = LightBlueMuted,
    onSecondaryContainer = Navy,
    background = Background,
    onBackground = TextPrimary,
    surface = Surface,
    onSurface = TextPrimary,
    surfaceVariant = SurfaceElevated,
    onSurfaceVariant = TextSecondary,
    outline = OutlineSoft,
    error = DangerRed,
    onError = Color.White
)

@Composable
fun Accounts4SchoolsTheme(
    darkTheme: Boolean = false,
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
