package com.example.accounts4schools.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.HorizontalDivider
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
import com.example.accounts4schools.model.TransactionLineItem
import com.example.accounts4schools.model.TransactionType
import com.example.accounts4schools.navigation.DrawerDestination
import com.example.accounts4schools.ui.components.AppDrawerScaffold
import com.example.accounts4schools.ui.components.ChipTone
import com.example.accounts4schools.ui.components.SectionCard
import com.example.accounts4schools.ui.components.StatusChip
import com.example.accounts4schools.ui.components.transactionTypeIcon
import com.example.accounts4schools.ui.theme.LightBlue
import com.example.accounts4schools.ui.theme.LightBlueMuted
import com.example.accounts4schools.ui.theme.Navy
import com.example.accounts4schools.ui.theme.TextMuted
import com.example.accounts4schools.ui.theme.TextSecondary

@Composable
fun StatementScreen(
    onDestinationSelected: (DrawerDestination) -> Unit,
    onNotificationsClicked: () -> Unit,
    modifier: Modifier = Modifier
) {
    val lines = DummyData.statementLines
    val orderedTypes = listOf(
        TransactionType.SCHOOL_FEES,
        TransactionType.CAMPS_EVENTS,
        TransactionType.FUNDRAISING
    )

    AppDrawerScaffold(
        title = "Statement",
        selectedDestination = DrawerDestination.Statement,
        onDestinationSelected = onDestinationSelected,
        onNotificationsClick = onNotificationsClicked
    ) { innerPadding ->
        LazyColumn(
            modifier = modifier
                .padding(innerPadding)
                .fillMaxSize(),
            contentPadding = PaddingValues(horizontal = 18.dp, vertical = 12.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            item {
                SectionCard {
                    Text(
                        text = "Account statement",
                        style = MaterialTheme.typography.titleMedium,
                        color = Navy
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = "All amounts are shown in Rand (R).",
                        style = MaterialTheme.typography.bodyMedium,
                        color = TextSecondary
                    )
                    Spacer(modifier = Modifier.height(12.dp))
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(
                            text = "Total outstanding",
                            style = MaterialTheme.typography.bodyMedium,
                            color = TextMuted
                        )
                        Text(
                            text = DummyData.formatCurrency(DummyData.parentAccount.balance),
                            style = MaterialTheme.typography.titleMedium,
                            color = Navy
                        )
                    }
                }
            }

            items(orderedTypes) { type ->
                val typeItems = lines.filter { it.type == type }
                val sectionTotal = typeItems.sumOf { it.amount }

                SectionCard {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(
                            modifier = Modifier
                                .size(40.dp)
                                .clip(RoundedCornerShape(12.dp))
                                .background(LightBlueMuted),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = transactionTypeIcon(type.displayName),
                                contentDescription = null,
                                tint = LightBlue
                            )
                        }
                        Spacer(modifier = Modifier.size(12.dp))
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = type.displayName,
                                style = MaterialTheme.typography.titleMedium,
                                color = Navy
                            )
                            Text(
                                text = type.subtitle,
                                style = MaterialTheme.typography.bodySmall,
                                color = TextMuted
                            )
                        }
                        StatusChip(
                            text = DummyData.formatCurrency(sectionTotal),
                            tone = ChipTone.Info
                        )
                    }

                    Spacer(modifier = Modifier.height(14.dp))
                    HorizontalDivider(color = LightBlueMuted)
                    Spacer(modifier = Modifier.height(8.dp))

                    typeItems.forEachIndexed { index, item ->
                        StatementLineRow(item)
                        if (index != typeItems.lastIndex) {
                            HorizontalDivider(
                                modifier = Modifier.padding(vertical = 10.dp),
                                color = LightBlueMuted.copy(alpha = 0.7f)
                            )
                        }
                    }
                }
            }

            item { Spacer(modifier = Modifier.height(8.dp)) }
        }
    }
}

@Composable
private fun StatementLineRow(item: TransactionLineItem) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Column(modifier = Modifier.weight(1f)) {
            Text(
                text = item.title,
                style = MaterialTheme.typography.bodyLarge,
                color = Navy,
                fontWeight = FontWeight.Medium
            )
            Text(
                text = item.dateLabel,
                style = MaterialTheme.typography.bodySmall,
                color = TextMuted
            )
        }
        Text(
            text = DummyData.formatCurrency(item.amount),
            style = MaterialTheme.typography.titleMedium,
            color = Navy
        )
    }
}
