package com.example.accounts4schools.data

import com.example.accounts4schools.model.NotificationItem
import com.example.accounts4schools.model.ParentAccount
import com.example.accounts4schools.model.ParentProfile
import com.example.accounts4schools.model.PaymentMethod
import com.example.accounts4schools.model.TransactionLineItem
import com.example.accounts4schools.model.TransactionType
import java.text.NumberFormat
import java.util.Currency
import java.util.Locale

object DummyData {
    private val zaLocale = Locale("en", "ZA")
    private val currencyFormat: NumberFormat = NumberFormat.getCurrencyInstance(zaLocale).apply {
        currency = Currency.getInstance("ZAR")
    }

    fun formatCurrency(amount: Double): String = currencyFormat.format(amount)

    val parentAccount: ParentAccount = ParentAccount(
        parentName = "Thandi Nkosi",
        studentName = "Lerato Nkosi",
        grade = "Grade 8",
        schoolName = "Westville High School",
        accountNumber = "ACC-48291",
        balance = 1_250.75,
        isInArrears = true,
        arrearsLabel = "Overdue since 12 Jul 2026"
    )

    val statementLines: List<TransactionLineItem> = listOf(
        TransactionLineItem(
            id = "fees-term-3",
            type = TransactionType.SCHOOL_FEES,
            title = "Term 3 school fees",
            dateLabel = "05 Aug 2026",
            amount = 860.00
        ),
        TransactionLineItem(
            id = "fees-adjustment",
            type = TransactionType.SCHOOL_FEES,
            title = "Previous balance adjustment",
            dateLabel = "15 Jun 2026",
            amount = 390.75
        ),
        TransactionLineItem(
            id = "camp-robotics",
            type = TransactionType.CAMPS_EVENTS,
            title = "Robotics camp - Durban",
            dateLabel = "22 Jul 2026",
            amount = 950.00
        ),
        TransactionLineItem(
            id = "camp-sports-day",
            type = TransactionType.CAMPS_EVENTS,
            title = "Inter-house sports day",
            dateLabel = "10 Jul 2026",
            amount = 85.00
        ),
        TransactionLineItem(
            id = "fundraising-drive",
            type = TransactionType.FUNDRAISING,
            title = "Annual fundraising drive",
            dateLabel = "01 Aug 2026",
            amount = 150.00
        ),
        TransactionLineItem(
            id = "fundraising-raffle",
            type = TransactionType.FUNDRAISING,
            title = "School raffle tickets",
            dateLabel = "28 Jul 2026",
            amount = 50.00
        )
    )

    val notifications: List<NotificationItem> = listOf(
        NotificationItem(
            id = "n1",
            title = "Fundraising alert",
            body = "The annual fundraising drive is open. Contributions help support new library resources.",
            dateLabel = "Today, 08:15",
            isUnread = true
        ),
        NotificationItem(
            id = "n2",
            title = "Payment reminder",
            body = "Your account is in arrears. Please settle outstanding school fees to avoid further notices.",
            dateLabel = "Yesterday, 16:40",
            isUnread = true
        ),
        NotificationItem(
            id = "n3",
            title = "Camps / events reminder",
            body = "Robotics camp fee is due before 15 Aug 2026. Review the amount on your statement.",
            dateLabel = "2 days ago",
            isUnread = false
        ),
        NotificationItem(
            id = "n4",
            title = "Statement available",
            body = "Your August statement is ready to view. School fees, camps and fundraising are listed separately.",
            dateLabel = "1 week ago",
            isUnread = false
        )
    )

    val profile: ParentProfile = ParentProfile(
        fullName = "Thandi Nkosi",
        phoneNumber = "082 456 7890",
        email = "thandi.nkosi@email.co.za",
        address = "14 Ridge Road, Westville, Durban, 3630"
    )

    fun buildPaymentReference(amount: Double, method: PaymentMethod): String {
        val methodCode = when (method) {
            PaymentMethod.CARD -> "CARD"
            PaymentMethod.EFT -> "EFT"
        }
        return "NC-$methodCode-${(amount * 100).toInt()}"
    }
}
