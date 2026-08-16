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
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.AccountBalanceWallet
import androidx.compose.material.icons.outlined.Notifications
import androidx.compose.material.icons.outlined.Person
import androidx.compose.material.icons.outlined.ReceiptLong
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.accounts4schools.data.DummyData
import com.example.accounts4schools.navigation.DrawerDestination
import com.example.accounts4schools.ui.components.AppDrawerScaffold
import com.example.accounts4schools.ui.components.ChipTone
import com.example.accounts4schools.ui.components.QuickActionCard
import com.example.accounts4schools.ui.components.SectionCard
import com.example.accounts4schools.ui.components.StatusChip
import com.example.accounts4schools.ui.theme.LightBlue
import com.example.accounts4schools.ui.theme.Navy
import com.example.accounts4schools.ui.theme.TextMuted
import com.example.accounts4schools.ui.theme.TextSecondary

@Composable
fun HomeScreen(
    onDestinationSelected: (DrawerDestination) -> Unit,
    onStatementClicked: () -> Unit,
    onPaymentClicked: () -> Unit,
    onProfileClicked: () -> Unit,
    onNotificationsClicked: () -> Unit,
    modifier: Modifier = Modifier
) {
    val account = DummyData.parentAccount

    AppDrawerScaffold(
        title = "Home",
        selectedDestination = DrawerDestination.Home,
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
            Column {
                Text(
                    text = "Good day, ${account.parentName.split(" ").first()}",
                    style = MaterialTheme.typography.headlineSmall,
                    color = Navy
                )
                Text(
                    text = "${account.studentName} - ${account.grade}",
                    style = MaterialTheme.typography.bodyMedium,
                    color = TextSecondary
                )
            }

            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(22.dp))
                    .background(
                        brush = Brush.linearGradient(
                            colors = listOf(Navy, Color(0xFF2A4A7A), LightBlue)
                        )
                    )
                    .padding(22.dp)
            ) {
                Column {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Outstanding balance",
                            style = MaterialTheme.typography.labelLarge,
                            color = Color.White.copy(alpha = 0.85f)
                        )
                        if (account.isInArrears) {
                            StatusChip(text = "IN ARREARS", tone = ChipTone.Danger)
                        }
                    }
                    Spacer(modifier = Modifier.height(10.dp))
                    Text(
                        text = DummyData.formatCurrency(account.balance),
                        style = MaterialTheme.typography.displaySmall,
                        color = Color.White,
                        fontWeight = FontWeight.Bold
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Account ${account.accountNumber}",
                        style = MaterialTheme.typography.bodySmall,
                        color = Color.White.copy(alpha = 0.75f)
                    )
                    if (account.isInArrears) {
                        Spacer(modifier = Modifier.height(10.dp))
                        Text(
                            text = account.arrearsLabel,
                            style = MaterialTheme.typography.bodyMedium,
                            color = Color(0xFFFFCDD2),
                            fontWeight = FontWeight.Medium
                        )
                    }
                    Spacer(modifier = Modifier.height(18.dp))
                    Button(
                        onClick = onPaymentClicked,
                        shape = RoundedCornerShape(12.dp),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = Color.White,
                            contentColor = Navy
                        )
                    ) {
                        Text("Pay now", fontWeight = FontWeight.SemiBold)
                    }
                }
            }

            SectionCard {
                Text(
                    text = "Learner summary",
                    style = MaterialTheme.typography.titleMedium,
                    color = Navy
                )
                Spacer(modifier = Modifier.height(12.dp))
                SummaryRow(label = "School", value = account.schoolName)
                Spacer(modifier = Modifier.height(8.dp))
                SummaryRow(label = "Learner", value = account.studentName)
                Spacer(modifier = Modifier.height(8.dp))
                SummaryRow(label = "Grade", value = account.grade)
            }

            Text(
                text = "Quick actions",
                style = MaterialTheme.typography.titleMedium,
                color = Navy
            )

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                QuickActionCard(
                    title = "Statement",
                    subtitle = "Fees, camps & fundraising",
                    icon = Icons.Outlined.ReceiptLong,
                    onClick = onStatementClicked,
                    modifier = Modifier.weight(1f)
                )
                QuickActionCard(
                    title = "Payment",
                    subtitle = "Pay with Netcash",
                    icon = Icons.Outlined.AccountBalanceWallet,
                    onClick = onPaymentClicked,
                    modifier = Modifier.weight(1f)
                )
            }

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                QuickActionCard(
                    title = "Profile",
                    subtitle = "Contact details",
                    icon = Icons.Outlined.Person,
                    onClick = onProfileClicked,
                    modifier = Modifier.weight(1f)
                )
                QuickActionCard(
                    title = "Alerts",
                    subtitle = "School notifications",
                    icon = Icons.Outlined.Notifications,
                    onClick = onNotificationsClicked,
                    modifier = Modifier.weight(1f)
                )
            }

            SectionCard {
                Text(
                    text = "Need help?",
                    style = MaterialTheme.typography.titleMedium,
                    color = Navy
                )
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = "For account queries, contact the school finance office during school hours.",
                    style = MaterialTheme.typography.bodyMedium,
                    color = TextSecondary
                )
            }

            Spacer(modifier = Modifier.height(8.dp))
        }
    }
}

@Composable
private fun SummaryRow(label: String, value: String) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Text(text = label, style = MaterialTheme.typography.bodyMedium, color = TextMuted)
        Text(text = value, style = MaterialTheme.typography.bodyMedium, color = Navy, fontWeight = FontWeight.Medium)
    }
}
