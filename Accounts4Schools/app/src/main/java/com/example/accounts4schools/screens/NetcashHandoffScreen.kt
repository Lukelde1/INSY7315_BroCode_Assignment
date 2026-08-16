package com.example.accounts4schools.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.example.accounts4schools.data.DummyData
import com.example.accounts4schools.model.PaymentMethod
import com.example.accounts4schools.ui.components.SectionCard
import com.example.accounts4schools.ui.components.SimpleTopScaffold
import com.example.accounts4schools.ui.theme.LightBlue
import com.example.accounts4schools.ui.theme.Navy
import com.example.accounts4schools.ui.theme.TextSecondary
import kotlinx.coroutines.delay

@Composable
fun NetcashHandoffScreen(
    amount: Double,
    paymentMethod: PaymentMethod,
    onHandoffComplete: (amount: Double, method: PaymentMethod) -> Unit,
    onBackClicked: () -> Unit,
    modifier: Modifier = Modifier
) {
    LaunchedEffect(amount, paymentMethod) {
        delay(1800)
        onHandoffComplete(amount, paymentMethod)
    }

    SimpleTopScaffold(
        title = "Netcash",
        onBack = onBackClicked
    ) { innerPadding ->
        Column(
            modifier = modifier
                .padding(innerPadding)
                .fillMaxSize()
                .padding(horizontal = 18.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            SectionCard {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    CircularProgressIndicator(
                        modifier = Modifier.size(56.dp),
                        color = LightBlue,
                        strokeWidth = 4.dp
                    )
                    Spacer(modifier = Modifier.height(18.dp))
                    Text(
                        text = "Redirecting to Netcash...",
                        style = MaterialTheme.typography.titleLarge,
                        color = Navy,
                        textAlign = TextAlign.Center
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Please wait while we connect you to complete a payment of ${DummyData.formatCurrency(amount)}.",
                        style = MaterialTheme.typography.bodyMedium,
                        color = TextSecondary,
                        textAlign = TextAlign.Center
                    )
                    Spacer(modifier = Modifier.height(12.dp))
                    Text(
                        text = paymentMethod.displayName,
                        style = MaterialTheme.typography.labelMedium,
                        color = LightBlue
                    )
                }
            }
        }
    }
}
