package com.example.accounts4schools.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.accounts4schools.data.DummyData
import com.example.accounts4schools.model.PaymentMethod
import com.example.accounts4schools.ui.components.SectionCard
import com.example.accounts4schools.ui.components.SimpleTopScaffold
import com.example.accounts4schools.ui.theme.LightBlue
import com.example.accounts4schools.ui.theme.Navy
import com.example.accounts4schools.ui.theme.SuccessGreen
import com.example.accounts4schools.ui.theme.SuccessSoft
import com.example.accounts4schools.ui.theme.TextMuted
import com.example.accounts4schools.ui.theme.TextSecondary

@Composable
fun ConfirmationScreen(
    amount: Double,
    paymentMethod: PaymentMethod,
    onBackToHomeClicked: () -> Unit,
    modifier: Modifier = Modifier
) {
    val reference = DummyData.buildPaymentReference(amount, paymentMethod)

    SimpleTopScaffold(
        title = "Confirmation",
        onBack = onBackToHomeClicked
    ) { innerPadding ->
        Column(
            modifier = modifier
                .padding(innerPadding)
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 18.dp, vertical = 12.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Spacer(modifier = Modifier.height(8.dp))
            Box(
                modifier = Modifier
                    .size(72.dp)
                    .clip(CircleShape)
                    .background(SuccessSoft),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Filled.Check,
                    contentDescription = null,
                    tint = SuccessGreen,
                    modifier = Modifier.size(36.dp)
                )
            }
            Text(
                text = "Payment successful",
                style = MaterialTheme.typography.headlineSmall,
                color = SuccessGreen,
                fontWeight = FontWeight.SemiBold
            )
            Text(
                text = "Thank you. A confirmation has been sent to your registered email and phone number.",
                style = MaterialTheme.typography.bodyMedium,
                color = TextSecondary
            )

            SectionCard {
                Text(
                    text = "Transaction summary",
                    style = MaterialTheme.typography.titleMedium,
                    color = Navy
                )
                Spacer(modifier = Modifier.height(14.dp))
                SummaryLine(label = "Amount paid", value = DummyData.formatCurrency(amount))
                Spacer(modifier = Modifier.height(10.dp))
                SummaryLine(label = "Method", value = paymentMethod.displayName)
                Spacer(modifier = Modifier.height(10.dp))
                SummaryLine(label = "Reference", value = reference)
                Spacer(modifier = Modifier.height(10.dp))
                SummaryLine(label = "Learner", value = DummyData.parentAccount.studentName)
                Spacer(modifier = Modifier.height(10.dp))
                SummaryLine(label = "School", value = DummyData.parentAccount.schoolName)
            }

            Button(
                onClick = onBackToHomeClicked,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(52.dp),
                colors = ButtonDefaults.buttonColors(containerColor = LightBlue)
            ) {
                Text("Back to Home", style = MaterialTheme.typography.labelLarge)
            }
        }
    }
}

@Composable
private fun SummaryLine(label: String, value: String) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(text = label, style = MaterialTheme.typography.bodyMedium, color = TextMuted)
        Text(
            text = value,
            style = MaterialTheme.typography.bodyMedium,
            color = Navy,
            fontWeight = FontWeight.SemiBold
        )
    }
}
