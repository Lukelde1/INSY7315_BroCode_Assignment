package com.example.accounts4schools.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import com.example.accounts4schools.data.DummyData
import com.example.accounts4schools.model.PaymentMethod
import com.example.accounts4schools.navigation.DrawerDestination
import com.example.accounts4schools.ui.components.AppDrawerScaffold
import com.example.accounts4schools.ui.components.SectionCard
import com.example.accounts4schools.ui.components.SelectableOptionCard
import com.example.accounts4schools.ui.theme.DangerRed
import com.example.accounts4schools.ui.theme.LightBlue
import com.example.accounts4schools.ui.theme.Navy
import com.example.accounts4schools.ui.theme.TextMuted
import com.example.accounts4schools.ui.theme.TextSecondary

@Composable
fun PaymentScreen(
    onDestinationSelected: (DrawerDestination) -> Unit,
    onNotificationsClicked: () -> Unit,
    onPayWithNetcashClicked: (amount: String, method: PaymentMethod) -> Unit,
    modifier: Modifier = Modifier
) {
    var amountText by rememberSaveable {
        mutableStateOf(DummyData.parentAccount.balance.toString())
    }
    var selectedMethod by rememberSaveable { mutableStateOf(PaymentMethod.CARD) }
    var errorText by rememberSaveable { mutableStateOf<String?>(null) }

    fun parseAmountOrNull(raw: String): Double? {
        val sanitized = raw.trim().replace(',', '.')
        return sanitized.toDoubleOrNull()
    }

    AppDrawerScaffold(
        title = "Payment",
        selectedDestination = DrawerDestination.Payment,
        onDestinationSelected = onDestinationSelected,
        onNotificationsClick = onNotificationsClicked
    ) { innerPadding ->
        Column(
            modifier = modifier
                .padding(innerPadding)
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 18.dp, vertical = 12.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            SectionCard {
                Text(
                    text = "Pay school fees",
                    style = MaterialTheme.typography.titleMedium,
                    color = Navy
                )
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = "Outstanding balance: ${DummyData.formatCurrency(DummyData.parentAccount.balance)}",
                    style = MaterialTheme.typography.bodyMedium,
                    color = TextSecondary
                )
                Spacer(modifier = Modifier.height(14.dp))
                OutlinedTextField(
                    value = amountText,
                    onValueChange = {
                        amountText = it
                        errorText = null
                    },
                    modifier = Modifier.fillMaxWidth(),
                    label = { Text("Amount (ZAR)") },
                    prefix = { Text("R ") },
                    singleLine = true,
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                    supportingText = {
                        Text("Enter the amount you wish to pay in Rand")
                    },
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = LightBlue,
                        focusedLabelColor = LightBlue,
                        cursorColor = LightBlue
                    )
                )
                errorText?.let {
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(text = it, color = DangerRed, style = MaterialTheme.typography.bodySmall)
                }
            }

            SectionCard {
                Text(
                    text = "Payment method",
                    style = MaterialTheme.typography.titleMedium,
                    color = Navy
                )
                Spacer(modifier = Modifier.height(12.dp))
                SelectableOptionCard(
                    title = PaymentMethod.CARD.displayName,
                    subtitle = PaymentMethod.CARD.hint,
                    selected = selectedMethod == PaymentMethod.CARD,
                    onClick = { selectedMethod = PaymentMethod.CARD }
                )
                Spacer(modifier = Modifier.height(10.dp))
                SelectableOptionCard(
                    title = PaymentMethod.EFT.displayName,
                    subtitle = PaymentMethod.EFT.hint,
                    selected = selectedMethod == PaymentMethod.EFT,
                    onClick = { selectedMethod = PaymentMethod.EFT }
                )
            }

            SectionCard {
                Text(
                    text = "Secure checkout",
                    style = MaterialTheme.typography.titleMedium,
                    color = Navy
                )
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = "You will be redirected to Netcash to complete your payment securely.",
                    style = MaterialTheme.typography.bodyMedium,
                    color = TextSecondary
                )
                Spacer(modifier = Modifier.height(16.dp))
                Button(
                    onClick = {
                        val amt = parseAmountOrNull(amountText)
                        when {
                            amt == null || amt <= 0.0 -> {
                                errorText = "Please enter a valid amount greater than R 0.00"
                            }
                            else -> {
                                onPayWithNetcashClicked(
                                    amountText.trim().replace(',', '.'),
                                    selectedMethod
                                )
                            }
                        }
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(52.dp),
                    shape = RoundedCornerShape(14.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = LightBlue)
                ) {
                    Text("Pay with Netcash", style = MaterialTheme.typography.labelLarge)
                }
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "Secured by Netcash"
                    style = MaterialTheme.typography.labelMedium,
                    color = TextMuted
                )
            }

            Spacer(modifier = Modifier.height(8.dp))
        }
    }
}
